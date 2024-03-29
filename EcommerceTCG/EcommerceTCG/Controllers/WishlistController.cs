using EcommerceTCG.Data;
using EcommerceTCG.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public WishlistController(EcommerceTcgContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("getwishlist")]
        public async Task<ActionResult<IEnumerable<object>>> GetWishlist(int userId)
        {
            return await _context.Wishlists.Where(w => w.UserId == userId)
                .Include(w => w.Product)
                .Include(w => w.User)
                .Select(w => new
                {
                    w.WishlistId,
                    w.UserId,
                    w.ProductId,
                    w.DateAdded,
                    Product = new
                    {
                        w.Product.ProductId,
                        w.Product.Name,
                        w.Product.Price,
                        w.Product.AvailableQuantity,
                        w.Product.ImageUrl,
                        w.Product.SerialNumber,
                        w.Product.FirstEdition,
                        w.Product.Rarity.Description,
                        expName = w.Product.Expansion.Name,
                        w.Product.Expansion.ReleaseDate,
                        category = w.Product.Type.Name,
                        w.Product.Language,
                        w.Product.Condition,
                    }
                })
                .ToListAsync();
        }


        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<Wishlist>> AddToWishlist(int ProductId, int userId)
        {

            var wishlist = new Wishlist
            {
                UserId = userId,
                ProductId = ProductId,
                DateAdded = DateTime.Now
            };

            if (await _context.Wishlists.AnyAsync(w => w.ProductId == ProductId && w.UserId == userId))
            {
                await RemoveFromWishlist(ProductId, userId);
                return Ok(new { message = "Articolo rimosso dai preferiti." });
            }

            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Articolo aggiunto ai preferiti." });
        }

        [HttpPost]
        [Route("remove")]
        public async Task<ActionResult<Wishlist>> RemoveFromWishlist(int ProductId, int userId)
        {
            var wishlist = await _context.Wishlists.FirstOrDefaultAsync(x => x.ProductId == ProductId && x.UserId == userId);

            if (wishlist == null)
            {
                return NotFound(new { message = "Articolo non trovato nei preferiti." });
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Articolo rimosso dai preferiti." });
        }

    }
}
