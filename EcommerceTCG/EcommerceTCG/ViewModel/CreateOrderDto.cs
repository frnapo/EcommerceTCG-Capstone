namespace EcommerceTCG.ViewModel
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public string RecipientFirstName { get; set; }
        public string RecipientLastName { get; set; }
        public string Address { get; set; }
        public string BuildingNumber { get; set; }
        public string ApartmentFloorInterior { get; set; }
        public string Zipcode { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Phone { get; set; }
        public string ShippingMethod { get; set; }
        public decimal ShippingCost { get; set; }
        public List<OrderItemDto> Items { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountApplied { get; set; }
    }
}
