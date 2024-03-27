﻿using EcommerceTCG.Data;
using EcommerceTCG.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
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
