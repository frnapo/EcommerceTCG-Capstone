using EcommerceTCG.Data;
using EcommerceTCG.Models;
using EcommerceTCG.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Diagnostics;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public CartController(EcommerceTcgContext context)
        {
            _context = context;
        }


        [HttpPost("createorder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto orderDto)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {

                decimal expectedShippingCost;
                switch (orderDto.ShippingMethod)
                {
                    case "Posta 4":
                        expectedShippingCost = 2.9M;
                        break;
                    case "Posta 1":
                        expectedShippingCost = 3.6M;
                        break;
                    case "Posta International":
                        expectedShippingCost = 4.9M;
                        break;
                    default:
                        return BadRequest("Metodo di spedizione non valido.");
                }

                if (orderDto.ShippingCost != expectedShippingCost)
                {
                    return BadRequest("Costo di spedizione non corrispondente al metodo selezionato.");
                }

                decimal orderTotal = orderDto.Items.Sum(item => item.Price * item.Quantity) + orderDto.ShippingCost;

                foreach (var item in orderDto.Items)
                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(p => p.ProductId == item.ProductId);

                    if (product == null)
                    {
                        return NotFound($"Prodotto con ID {item.ProductId} non trovato.");
                    }

                    if (product.AvailableQuantity < item.Quantity)
                    {
                        return BadRequest($"Quantità non disponibile per il prodotto {product.Name}. Disponibili: {product.AvailableQuantity}, richiesti: {item.Quantity}.");
                    }
                }

                var order = new Models.Order
                {
                    UserId = orderDto.UserId,
                    OrderDate = DateTime.UtcNow,
                    RecipientFirstName = orderDto.RecipientFirstName,
                    RecipientLastName = orderDto.RecipientLastName,
                    Address = orderDto.Address,
                    BuildingNumber = orderDto.BuildingNumber,
                    ApartmentFloorInterior = orderDto.ApartmentFloorInterior,
                    Zipcode = orderDto.Zipcode,
                    City = orderDto.City,
                    Province = orderDto.Province,
                    Phone = orderDto.Phone,
                    Total = orderTotal
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                foreach (var item in orderDto.Items)
                {
                    var orderDetail = new OrderDetail
                    {
                        OrderId = order.OrderId,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        Price = item.Price,
                        DiscountApplied = item.DiscountApplied
                    };

                    _context.OrderDetails.Add(orderDetail);
                }

                await _context.SaveChangesAsync();

                var shipment = new Shipment
                {
                    OrderId = order.OrderId,
                    ShippingMethod = orderDto.ShippingMethod,
                    ShippingCost = orderDto.ShippingCost,
                    Status = "Non Pagato",
                };

                _context.Shipments.Add(shipment);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = await paymentIntentService.CreateAsync(new PaymentIntentCreateOptions
                {
                    Amount = Convert.ToInt64(order.Total * 100),
                    Currency = "eur",
                    Metadata = new Dictionary<string, string>
                    {
                        { "orderId", order.OrderId.ToString() }
                    }
                });


                return Ok(new
                {
                    orderId = order.OrderId,
                    clientSecret = paymentIntent.ClientSecret,
                    orderTotal = orderTotal
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Errore durante la creazione dell'ordine: " + ex.Message);
            }
        }


        [HttpPost("webhook/stripe")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    "whsec_IWamLoXDnMo6KMP17cMe1ZRagnT9lkFc",
                    throwOnApiVersionMismatch: true
                );

                Debug.WriteLine($"Evento ricevuto: {stripeEvent.Type}");

                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    Debug.WriteLine($"PaymentIntent ID: {paymentIntent.Id}");

                    if (paymentIntent.Metadata.TryGetValue("orderId", out var orderIdString) &&
                        int.TryParse(orderIdString, out var orderId))
                    {
                        Debug.WriteLine($"Elaborazione ordine ID: {orderId}");
                        await UpdateOrderStatusToPaid(orderId);
                        await AdjustProductQuantities(orderId);
                    }
                    else
                    {
                        Debug.WriteLine("Impossibile trovare o convertire orderId.");
                        return BadRequest("Impossibile elaborare l'ordine.");
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Errore durante l'elaborazione del webhook: {ex.Message}");
                return StatusCode(500, "Errore interno del server");
            }

            return Ok();
        }

        private async Task UpdateOrderStatusToPaid(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Shipments)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order != null && order.Shipments.Any())
            {
                order.Shipments.First().Status = "Pagato";
                await _context.SaveChangesAsync();
                Debug.WriteLine($"Stato spedizione aggiornato a 'Pagato' per l'ordine ID: {orderId}.");
            }
            else
            {
                Debug.WriteLine($"Nessuna spedizione trovata per l'ordine ID: {orderId}.");
            }
        }

        private async Task AdjustProductQuantities(int orderId)
        {
            Debug.WriteLine($"Adeguamento quantità per l'ordine ID: {orderId}");
            var orderDetails = await _context.OrderDetails
                .Where(od => od.OrderId == orderId)
                .Include(od => od.Product)
                .ToListAsync();

            foreach (var detail in orderDetails)
            {
                if (detail.Product.AvailableQuantity >= detail.Quantity)
                {
                    detail.Product.AvailableQuantity -= detail.Quantity;
                    Debug.WriteLine($"Aggiornata quantità per il prodotto ID: {detail.ProductId}");
                }
                else
                {
                    // Gestire il caso in cui la quantità non sia disponibile
                    Debug.WriteLine($"Quantità non disponibile per il prodotto ID: {detail.ProductId}. Richiesti: {detail.Quantity}, Disponibili: {detail.Product.AvailableQuantity}");
                }
            }

            await _context.SaveChangesAsync();
        }



    }
}

