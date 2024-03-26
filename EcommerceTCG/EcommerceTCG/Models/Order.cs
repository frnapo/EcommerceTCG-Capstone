using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Order
{
    [Key]
    [Column("OrderID")]
    public int OrderId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime OrderDate { get; set; }

    [StringLength(50)]
    public string RecipientFirstName { get; set; } = null!;

    [StringLength(50)]
    public string RecipientLastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    [StringLength(10)]
    public string BuildingNumber { get; set; } = null!;

    public string? ApartmentFloorInterior { get; set; }

    [Column("ZIPCode")]
    [StringLength(5)]
    public string Zipcode { get; set; } = null!;

    [StringLength(50)]
    public string City { get; set; } = null!;

    [StringLength(2)]
    public string Province { get; set; } = null!;

    [StringLength(20)]
    public string? Phone { get; set; }

    [Column(TypeName = "decimal(7, 2)")]
    public decimal Total { get; set; }

    [InverseProperty("Order")]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    [InverseProperty("Order")]
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    [InverseProperty("Order")]
    public virtual ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();

    [ForeignKey("UserId")]
    [InverseProperty("Orders")]
    public virtual User User { get; set; } = null!;
}
