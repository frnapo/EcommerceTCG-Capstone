using EcommerceTCG.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public OrdersController(EcommerceTcgContext context)
        {
            _context = context;
        }

        //action che ritorna quattro prodotti suggeriti in base all'aquisto di un prodotto

        [HttpGet("suggested/{orderId}")]
        public IActionResult Suggested(int orderId)
        {
            var orderProducts = _context.OrderDetails
                                      .Where(od => od.OrderId == orderId)
                                      .Select(od => od.Product)
                                      .ToList();
            var typeId = orderProducts.FirstOrDefault()?.TypeId;

            if (typeId == null)
            {
                return NotFound();
            }

            var suggestedProducts = _context.Products
                                           .Where(p => p.TypeId == typeId && p.ProductId != orderId)
                                           .OrderByDescending(p => p.AvailableQuantity)
                                           .Take(4)
                                           .Select(p => new
                                           {
                                               p.ProductId,
                                               p.Name,
                                               p.Price,
                                               p.AvailableQuantity,
                                               p.ImageUrl,
                                               p.SerialNumber,
                                               p.FirstEdition,
                                               Rarity = p.Rarity.Description,
                                               Expansion = p.Expansion.Name,
                                               Type = p.Type.Name,
                                               p.Language,
                                               p.Condition,
                                           })
                                           .ToList();

            return Ok(suggestedProducts);
        }



        //action che ritorna tutti i prodotti in base all'orderId
        [HttpGet("byorder/{orderId}")]
        public IActionResult ByOrder(int orderId)
        {
            var orderProducts = _context.OrderDetails
                                      .Where(od => od.OrderId == orderId)
                                      .Select(od => new
                                      {
                                          od.Product.ProductId,
                                          od.Product.Name,
                                          od.Product.Price,
                                          od.Product.AvailableQuantity,
                                          od.Product.ImageUrl,
                                          od.Product.SerialNumber,
                                          od.Product.FirstEdition,
                                          Rarity = od.Product.Rarity.Description,
                                          Expansion = od.Product.Expansion.Name,
                                          Type = od.Product.Type.Name,
                                          od.Product.Language,
                                          od.Product.Condition,
                                          od.Quantity,
                                          od.Order.RecipientFirstName,
                                          od.Order.RecipientLastName,
                                          od.Order.Address,
                                          od.Order.BuildingNumber,
                                          od.Order.ApartmentFloorInterior,
                                          od.Order.Zipcode,
                                          od.Order.City,
                                          od.Order.Province,
                                          od.Order.Phone,
                                          od.Order.Total,
                                      })
                                      .ToList();

            var shippingPrice = _context.Orders
                                      .Where(o => o.OrderId == orderId)
                                      .Select(o => o.Shipments.FirstOrDefault().ShippingCost)
                                      .FirstOrDefault();

            var orderWithShipping = new
            {
                OrderProducts = orderProducts,
                ShippingPrice = shippingPrice
            };

            return Ok(orderWithShipping);
        }


        //action per annullare un ordine dato l'orderId, non lo cancella, ma setta lo Status a "Annullato"
        [HttpPut("cancel/{orderId}")]
        public async Task<IActionResult> Cancel(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Shipments)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound();
            }

            order.Shipments.FirstOrDefault().Status = "Annullato";
            await _context.SaveChangesAsync();

            return Ok();
        }


        //action che annulla tutti gli ordini contrassegnati come "Non pagato" e che sono stati creati più di 30 minuti fa
        [HttpPut("cancelunpaid")]
        public async Task<IActionResult> CancelUnpaid()
        {
            var orders = await _context.Orders
                .Include(o => o.Shipments)
                .Where(o => o.Shipments.Any() && o.Shipments.FirstOrDefault().Status == "Non Pagato" && (DateTime.Now - o.OrderDate).TotalMinutes > 30)
                .ToListAsync();

            foreach (var order in orders)
            {
                order.Shipments.FirstOrDefault().Status = "Annullato";
            }

            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("orderbyuser/{userId}")]
        public IActionResult ByUser(int userId)
        {
            var orders = _context.Orders
                .Include(o => o.Shipments)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.OrderId,
                    o.OrderDate,
                    o.Shipments.FirstOrDefault().Status,
                    o.Total,
                    o.Shipments.FirstOrDefault().ShippingCost,
                    o.Shipments.FirstOrDefault().ShippingMethod,
                    o.Shipments.FirstOrDefault().TrackingNumber,
                    o.Shipments.FirstOrDefault().DepartureDate,
                    o.Shipments.FirstOrDefault().ActualDeliveryDate,
                })
                .ToList();

            return Ok(orders);
        }


    }
}
