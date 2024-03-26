using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Wishlist
{
    [Key]
    [Column("WishlistID")]
    public int WishlistId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [Column("ProductID")]
    public int ProductId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime DateAdded { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("Wishlists")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Wishlists")]
    public virtual User User { get; set; } = null!;
}
