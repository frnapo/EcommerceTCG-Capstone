using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Models;

public partial class Shipment
{
    [Key]
    [Column("ShipmentID")]
    public int ShipmentId { get; set; }

    [Column("OrderID")]
    public int OrderId { get; set; }

    [StringLength(255)]
    public string ShippingMethod { get; set; } = null!;

    [Column(TypeName = "decimal(7, 2)")]
    public decimal ShippingCost { get; set; }

    [StringLength(255)]
    public string Status { get; set; } = null!;

    [StringLength(255)]
    public string? TrackingNumber { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DepartureDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? EstimatedDeliveryDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ActualDeliveryDate { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("Shipments")]
    public virtual Order Order { get; set; } = null!;
}
