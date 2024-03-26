using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Expansion
{
    [Key]
    [Column("ExpansionID")]
    public int ExpansionId { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    public DateOnly ReleaseDate { get; set; }

    [Column("ImageURL")]
    public string? ImageUrl { get; set; }

    [Column("TypeID")]
    public int TypeId { get; set; }

    [InverseProperty("Expansion")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [ForeignKey("TypeId")]
    [InverseProperty("Expansions")]
    public virtual CardType Type { get; set; } = null!;
}
