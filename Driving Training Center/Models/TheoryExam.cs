using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class TheoryExam : BaseModel
    {
        public List<ApplicantTheoryExam> Applicants { get; set; }

        [ForeignKey("Staff")]
        public int staff_id { get; set; }
        public virtual Staff Staff { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string time { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string description { get; set; }
    }
}
