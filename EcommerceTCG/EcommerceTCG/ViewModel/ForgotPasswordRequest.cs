using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
