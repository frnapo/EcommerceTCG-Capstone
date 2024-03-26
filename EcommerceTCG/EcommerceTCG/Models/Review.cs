using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Review
{
    [Key]
    [Column("ReviewID")]
    public int ReviewId { get; set; }

    [Column("OrderID")]
    public int OrderId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    public int Rating { get; set; }

    public string? Text { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime ReviewDate { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("Reviews")]
    public virtual Order Order { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Reviews")]
    public virtual User User { get; set; } = null!;
}
