using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class CardTypeViewModel
    {
        [StringLength(50)]
        public string Name { get; set; } = null!;
    }
}
