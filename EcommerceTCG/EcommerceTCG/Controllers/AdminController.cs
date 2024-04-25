using EcommerceTCG.Data;
using EcommerceTCG.Models;
using EcommerceTCG.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public AdminController(EcommerceTcgContext context)
        {
            _context = context;
        }

        //action che crea un cardtype
        [HttpPost("CreateCardType")]
        public IActionResult CreateCardType([FromBody] CardTypeViewModel cardTypeViewModel)
        {
            var cardType = new CardType
            {
                Name = cardTypeViewModel.Name
            };

            _context.CardTypes.Add(cardType);
            _context.SaveChanges();

            return Ok();
        }

        //action che modifica un cardtype
        [HttpPut("EditCardType/{id}")]
        public IActionResult EditCardType(int id, [FromBody] CardTypeViewModel cardTypeViewModel)
        {
            var cardType = _context.CardTypes.Find(id);

            if (cardType == null)
            {
                return NotFound();
            }

            cardType.Name = cardTypeViewModel.Name;

            _context.SaveChanges();

            return Ok();
        }

        //action che crea nuove espansioni
        [HttpPost("CreateExpansion")]
        public IActionResult CreateExpansion([FromBody] ExpViewModel expViewModel)
        {
            var expansion = new Expansion
            {
                Name = expViewModel.Name,
                ReleaseDate = expViewModel.ReleaseDate,
                ImageUrl = expViewModel.ImageUrl,
                TypeId = expViewModel.TypeId
            };

            _context.Expansions.Add(expansion);
            _context.SaveChanges();

            return Ok();
        }

        //action che modifica un'espansione
        [HttpPut("EditExpansion/{id}")]
        public IActionResult EditExpansion(int id, [FromBody] ExpViewModel expViewModel)
        {
            var expansion = _context.Expansions.Find(id);

            if (expansion == null)
            {
                return NotFound();
            }

            expansion.Name = expViewModel.Name;
            expansion.ReleaseDate = expViewModel.ReleaseDate;
            expansion.ImageUrl = expViewModel.ImageUrl;
            expansion.TypeId = expViewModel.TypeId;

            _context.SaveChanges();

            return Ok();
        }

        //action che crea nuove rarita'
        [HttpPost("CreateRarity")]
        public IActionResult CreateRarity([FromBody] RarityViewModel rarityViewModel)
        {
            var rarity = new Rarity
            {
                Description = rarityViewModel.Description,
                TypeId = rarityViewModel.TypeId
            };

            _context.Rarities.Add(rarity);
            _context.SaveChanges();

            return Ok();
        }

        //action che modifica una rarita'
        [HttpPut("EditRarity/{id}")]
        public IActionResult EditRarity(int id, [FromBody] RarityViewModel rarityViewModel)
        {
            var rarity = _context.Rarities.Find(id);

            if (rarity == null)
            {
                return NotFound();
            }

            rarity.Description = rarityViewModel.Description;
            rarity.TypeId = rarityViewModel.TypeId;

            _context.SaveChanges();

            return Ok();
        }

        //action che restituisce tutti gli ordini data dell'ordine = a oggi
        [HttpGet("GetTodayOrders")]
        public IActionResult GetOrders()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);

            var orders = _context.Orders
                .Include(o => o.Shipments)
                .Where(o => o.OrderDate >= today && o.OrderDate < tomorrow)
                .Select(o => new
                {
                    o.OrderId,
                    o.OrderDate,
                    Status = o.Shipments.FirstOrDefault().Status,
                    o.Total,
                    ShippingCost = o.Shipments.FirstOrDefault().ShippingCost,
                    ShippingMethod = o.Shipments.FirstOrDefault().ShippingMethod,
                    TrackingNumber = o.Shipments.FirstOrDefault().TrackingNumber,
                    DepartureDate = o.Shipments.FirstOrDefault().DepartureDate,
                    ActualDeliveryDate = o.Shipments.FirstOrDefault().ActualDeliveryDate,
                })
                .ToList();

            return Ok(orders);
        }

        //action che restituisce tutti gli ordini con  Shipments.Status = "Pagato"
        [HttpGet("GetOrdersPaid")]
        public IActionResult GetOrdersPaid()
        {
            var orders = _context.Orders
                .Where(o => o.Shipments.Any(s => s.Status == "Pagato"))
                                                .Select(o => new
                                                {
                                                    o.OrderId,
                                                    o.OrderDate,
                                                    o.RecipientFirstName,
                                                    o.RecipientLastName,
                                                    o.Address,
                                                    o.BuildingNumber,
                                                    o.ApartmentFloorInterior,
                                                    o.Zipcode,
                                                    o.City,
                                                    o.Province,
                                                    o.Phone,
                                                    o.Total,
                                                    o.Shipments.FirstOrDefault().Status,
                                                    o.Shipments.FirstOrDefault().ShippingCost,
                                                    o.Shipments.FirstOrDefault().ShippingMethod,
                                                    o.Shipments.FirstOrDefault().TrackingNumber,
                                                    o.Shipments.FirstOrDefault().DepartureDate,
                                                    o.Shipments.FirstOrDefault().ActualDeliveryDate,
                                                })
                .ToList();

            return Ok(orders);
        }

        //action che restituisce tutti gli ordini dalla data piu recente
        [HttpGet("GetOrdersRecent")]
        public IActionResult GetOrdersRecent()
        {
            var orders = _context.Orders
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

        //action che cambia lo status di una spedizione a "Spedito"
        [HttpPut("ShipOrder/{id}")]
        public IActionResult ShipOrder(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var shipment = _context.Shipments.FirstOrDefault(s => s.OrderId == id);
            if (shipment == null)
            {
                return NotFound("No shipment found for this order.");
            }
            shipment.Status = "Spedito";
            _context.SaveChanges();
            return Ok();
        }

        //action che restituisce gli ordini in base ad una data
        [HttpGet("GetOrdersByDate/{date}")]
        public IActionResult GetOrdersByDate(string date)
        {
            DateTime parsedDate = DateTime.Parse(date);
            var orders = _context.Orders
                .Where(o => o.OrderDate.Date == parsedDate.Date)
                .Select(o => new
                {
                    o.OrderId,
                    o.OrderDate,
                    Status = o.Shipments.FirstOrDefault().Status,
                    o.Total,
                    ShippingCost = o.Shipments.FirstOrDefault().ShippingCost,
                    ShippingMethod = o.Shipments.FirstOrDefault().ShippingMethod,
                    TrackingNumber = o.Shipments.FirstOrDefault().TrackingNumber,
                    DepartureDate = o.Shipments.FirstOrDefault().DepartureDate,
                    ActualDeliveryDate = o.Shipments.FirstOrDefault().ActualDeliveryDate,
                })
                .ToList();

            return Ok(orders);
        }
    }
}
