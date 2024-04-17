using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class UpdateUserView
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

    }
}
