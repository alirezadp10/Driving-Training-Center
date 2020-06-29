using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataLayer
{
    public class Staff : BaseModel
    {
        [JsonIgnore]
        public string password { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string first_name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string last_name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string gender { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string role { get; set; }

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

        [Column(TypeName = "int")]
        public int? salary { get; set; }
    }
}
