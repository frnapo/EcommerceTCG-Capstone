using EcommerceTCG.Data;
using EcommerceTCG.Models;
using EcommerceTCG.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Tesseract;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public ProductsController(EcommerceTcgContext context)
        {
            _context = context;
        }



        [HttpGet("bytype/{id}")]
        public IActionResult ByType(int id)
        {
            var products = _context.Products.Where(p => p.TypeId == id)
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




























        [HttpPost]
        public async Task<IActionResult> PostProduct([FromForm] ProductViewModel productViewModel)
        {
            string extractedText = string.Empty;
            string imagePath = null;

            if (productViewModel.ImageFile != null && productViewModel.ImageFile.Length > 0)
            {
                var imageName = Guid.NewGuid().ToString() + Path.GetExtension(productViewModel.ImageFile.FileName);
                var savePath = Path.Combine(Directory.GetCurrentDirectory(), "Img", imageName);
                Directory.CreateDirectory(Path.GetDirectoryName(savePath));

                using (var fileStream = new FileStream(savePath, FileMode.Create))
                {
                    await productViewModel.ImageFile.CopyToAsync(fileStream);
                }


                imagePath = $"/images/{imageName}";

                // Estrai il testo dall'immagine salvata
                extractedText = ExtractTextFromImage(savePath);
            }

            string productName = ExtractProductName(extractedText) ?? productViewModel.Name;
            string serialNumber = ExtractSerialNumber(extractedText) ?? productViewModel.SerialNumber;

            var product = new Product
            {
                Name = productName,
                Price = productViewModel.Price,
                AvailableQuantity = productViewModel.AvailableQuantity,
                SerialNumber = serialNumber,
                FirstEdition = productViewModel.FirstEdition,
                RarityId = productViewModel.RarityId,
                ExpansionId = productViewModel.ExpansionId,
                TypeId = productViewModel.TypeId,
                Language = productViewModel.Language,
                Condition = productViewModel.Condition,
                ImageUrl = imagePath
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }



        private string ExtractTextFromImage(string imagePath)
        {
            var dataPath = Path.Combine(Directory.GetCurrentDirectory(), "tessdata");
            using (var engine = new TesseractEngine(dataPath, "eng", EngineMode.Default))
            {
                using (var img = Pix.LoadFromFile(imagePath))
                {
                    using (var page = engine.Process(img))
                    {
                        return page.GetText();
                    }
                }
            }
        }

        private string ExtractProductName(string text)
        {
            var match = Regex.Match(text, "Product Name: (.+)");
            if (match.Success)
            {
                return match.Groups[1].Value.Trim();
            }
            return null;
        }

        private string ExtractSerialNumber(string text)
        {
            var match = Regex.Match(text, "Serial Number: (.+)");
            if (match.Success)
            {
                return match.Groups[1].Value.Trim();
            }
            return null;
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
    }
}
