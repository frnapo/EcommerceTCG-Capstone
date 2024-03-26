using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class CardType
{
    [Key]
    [Column("TypeID")]
    public int TypeId { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [InverseProperty("Type")]
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    [InverseProperty("Type")]
    public virtual ICollection<Expansion> Expansions { get; set; } = new List<Expansion>();

    [InverseProperty("Type")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [InverseProperty("Type")]
    public virtual ICollection<Rarity> Rarities { get; set; } = new List<Rarity>();
}
