using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class License : BaseModel
    {
        public List<Payment> Applicants { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string name { get; set; }

        [Column(TypeName = "text")]
        public string conditions { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int cost { get; set; }
    }
}
