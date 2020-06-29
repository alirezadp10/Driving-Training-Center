using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Vehicle : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string name { get; set; }

        //[Index(IsUnique = true)]
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string plate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string color { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }
    }
}
