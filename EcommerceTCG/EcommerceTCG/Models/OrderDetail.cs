using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class OrderDetail
{
    [Key]
    [Column("OrderDetailID")]
    public int OrderDetailId { get; set; }

    [Column("OrderID")]
    public int OrderId { get; set; }

    [Column("ProductID")]
    public int ProductId { get; set; }

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(7, 2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(7, 2)")]
    public decimal? DiscountApplied { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("OrderDetails")]
    public virtual Order Order { get; set; } = null!;

    [ForeignKey("ProductId")]
    [InverseProperty("OrderDetails")]
    public virtual Product Product { get; set; } = null!;
}
