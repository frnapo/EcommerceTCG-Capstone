using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Category
{
    [Key]
    [Column("CategoryID")]
    public int CategoryId { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Column("TypeID")]
    public int TypeId { get; set; }

    [ForeignKey("TypeId")]
    [InverseProperty("Categories")]
    public virtual CardType Type { get; set; } = null!;

    [ForeignKey("CategoryId")]
    [InverseProperty("Categories")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
