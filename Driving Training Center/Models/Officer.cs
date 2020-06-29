using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Officer : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string first_name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string last_name { get; set; }

        //[Index(IsUnique = true)]
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string national_code { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime birthdate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string phone { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string degree { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }

        [Column(TypeName = "int")]
        public int? salary { get; set; }

    }
}
