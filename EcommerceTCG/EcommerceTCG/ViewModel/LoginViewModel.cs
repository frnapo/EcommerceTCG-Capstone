using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class LoginViewModel
    {

        [StringLength(255)]
        public string Email { get; set; } = null!;

        [StringLength(256)]
        public string Password { get; set; } = null!;
    }
}
