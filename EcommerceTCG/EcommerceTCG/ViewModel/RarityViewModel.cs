using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceTCG.ViewModel
{
    public class RarityViewModel
    {
        [StringLength(50)]
        public string Description { get; set; } = null!;

        [Column("TypeID")]
        public int TypeId { get; set; }

    }
}
