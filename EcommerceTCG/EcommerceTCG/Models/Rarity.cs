using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Rarity
{
    [Key]
    [Column("RarityID")]
    public int RarityId { get; set; }

    [StringLength(50)]
    public string Description { get; set; } = null!;

    [Column("TypeID")]
    public int TypeId { get; set; }

    [InverseProperty("Rarity")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [ForeignKey("TypeId")]
    [InverseProperty("Rarities")]
    public virtual CardType Type { get; set; } = null!;
}
