using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class TheoryCourse : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string title { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }

        [ForeignKey("Staff")]
        public int staff_id { get; set; }
        public virtual Staff Staff { get; set; }

    }
}
