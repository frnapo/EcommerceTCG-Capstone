using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class ProductViewModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int AvailableQuantity { get; set; }
        public string? SerialNumber { get; set; }
        [Required]
        public bool FirstEdition { get; set; }
        [Required]
        public int RarityId { get; set; }
        [Required]
        public int ExpansionId { get; set; }
        [Required]
        public int TypeId { get; set; }
        [Required]
        public string Language { get; set; }
        [Required]
        public string Condition { get; set; }


        public IFormFile? ImageFile { get; set; }
    }
}
