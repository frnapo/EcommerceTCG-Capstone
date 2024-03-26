using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

[Index("Code", Name = "UQ__Coupons__A25C5AA7297871F1", IsUnique = true)]
public partial class Coupon
{
    [Key]
    [Column("CouponID")]
    public int CouponId { get; set; }

    [StringLength(50)]
    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    [Column(TypeName = "decimal(7, 2)")]
    public decimal Value { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime StartDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime EndDate { get; set; }

    public int RemainingUses { get; set; }
}
