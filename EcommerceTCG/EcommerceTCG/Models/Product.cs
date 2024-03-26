using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

[Index("SerialNumber", Name = "UQ__Products__048A00084D4C8BD0", IsUnique = true)]
public partial class Product
{
    [Key]
    [Column("ProductID")]
    public int ProductId { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column(TypeName = "decimal(7, 2)")]
    public decimal Price { get; set; }

    public int AvailableQuantity { get; set; }

    [Column("ImageURL")]
    public string? ImageUrl { get; set; }

    [StringLength(50)]
    public string? SerialNumber { get; set; }

    public bool FirstEdition { get; set; }

    [Column("RarityID")]
    public int RarityId { get; set; }

    [Column("ExpansionID")]
    public int ExpansionId { get; set; }

    [Column("TypeID")]
    public int TypeId { get; set; }

    [StringLength(50)]
    public string Language { get; set; } = null!;

    [StringLength(50)]
    public string Condition { get; set; } = null!;

    [ForeignKey("ExpansionId")]
    [InverseProperty("Products")]
    public virtual Expansion Expansion { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    [ForeignKey("RarityId")]
    [InverseProperty("Products")]
    public virtual Rarity Rarity { get; set; } = null!;

    [ForeignKey("TypeId")]
    [InverseProperty("Products")]
    public virtual CardType Type { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();

    [ForeignKey("ProductId")]
    [InverseProperty("Products")]
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
