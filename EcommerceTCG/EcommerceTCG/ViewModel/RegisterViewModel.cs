using System.ComponentModel.DataAnnotations;

namespace EcommerceTCG.ViewModel
{
    public class RegisterViewModel
    {
        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [StringLength(50)]
        public string LastName { get; set; } = null!;

        [StringLength(255)]
        public string Email { get; set; } = null!;

        [StringLength(256)]
        public string Password { get; set; } = null!;

        [StringLength(256)]
        public string ConfirmPassword { get; set; } = null!;

        public string? EmailConfirmToken { get; set; }

    }
}
