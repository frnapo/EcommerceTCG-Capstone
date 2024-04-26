using EcommerceTCG.Data;
using EcommerceTCG.Models;
using EcommerceTCG.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(EcommerceTcgContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }



        [HttpGet("bytype/{id}")]
        public IActionResult ByType(int id)
        {
            var products = _context.Products.Where(p => p.TypeId == id)
                                            .OrderByDescending(p => p.AvailableQuantity)
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
                                            }).ToList();
            return Ok(products);
        }



        [HttpGet("search/{name}")]
        public IActionResult Search(string name)
        {
            var products = _context.Products.Where(p => p.Name.Contains(name))
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
                                            }).ToList();
            return Ok(products);
        }




        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

























        [HttpPost("newproduct")]
        public async Task<IActionResult> PostProduct([FromBody] ProductViewModel productViewModel)
        {
            _logger.LogInformation($"Ricevuta nuova richiesta di prodotto: {JsonConvert.SerializeObject(productViewModel)}");

            string productname = productViewModel.Name;

            var product = new Product
            {
                Name = productname,
                Price = productViewModel.Price,
                AvailableQuantity = productViewModel.AvailableQuantity,
                ImageUrl = productViewModel.ImageUrl,
                SerialNumber = productViewModel.SerialNumber,
                FirstEdition = productViewModel.FirstEdition,
                RarityId = productViewModel.RarityId,
                ExpansionId = productViewModel.ExpansionId,
                TypeId = productViewModel.TypeId,
                Language = productViewModel.Language,
                Condition = productViewModel.Condition,
            };

            if (!_context.Rarities.Any(r => r.RarityId == product.RarityId))
            {
                return BadRequest("L'ID della rarità specificato non esiste nel database.");
            }

            if (!_context.Expansions.Any(e => e.ExpansionId == product.ExpansionId))
            {
                return BadRequest("L'ID dell'espansione specificato non esiste nel database.");
            }

            if (!_context.CardTypes.Any(t => t.TypeId == product.TypeId))
            {
                return BadRequest("L'ID del tipo specificato non esiste nel database.");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = productname + " inserito con successo!" });
        }




        [HttpPut("updateimage")]
        public async Task<IActionResult> UpdateProductImage([FromBody] UpdateProductImageViewModel updateModel)
        {
            _logger.LogInformation($"Ricevuta richiesta di aggiornamento immagine per il prodotto: {updateModel.SerialNumber}");
            var product = await _context.Products.FirstOrDefaultAsync(p => p.SerialNumber == updateModel.SerialNumber);

            if (product == null)
            {
                return NotFound($"Prodotto con SerialNumber {updateModel.SerialNumber} non trovato.");
            }

            product.ImageUrl = updateModel.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(new { message = $"Immagine del prodotto {product.Name} aggiornata con successo!" });
        }








        [HttpGet("expansions/byType")]
        public async Task<ActionResult<IEnumerable<Expansion>>> GetExpansionsByType(int typeId)
        {
            return await _context.Expansions
                                 .Where(e => e.TypeId == typeId)
                                 .ToListAsync();
        }

        // GET: api/Rarities
        [HttpGet("rarities/byType")]
        public async Task<ActionResult<IEnumerable<Rarity>>> GetRaritiesByType(int typeId)
        {
            return await _context.Rarities
                                 .Where(r => r.TypeId == typeId)
                                 .ToListAsync();
        }


        [HttpGet("hotbuy")]
        public async Task<ActionResult<IEnumerable<Product>>> GetHotbuy()
        {
            var products = _context.Products.Where(p => p.Price > 30 && p.AvailableQuantity > 0)
                                    .OrderByDescending(p => p.AvailableQuantity)
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
                                    }).ToList();
            return Ok(products);
        }


        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }


        //action che ritorna le ultime 4 espansioni  uscite in base alla data d'uscita
        [HttpGet("getlatestexpansions")]
        public async Task<IActionResult> GetLatestExpansions()
        {
            var expansions = await _context.Expansions
                .OrderByDescending(e => e.ReleaseDate)
                .Take(4)
                .ToListAsync();

            return Ok(expansions);
        }





    }
}
