using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class PracticalExam : BaseModel
    {
        [Required]
        [Column(TypeName = "date")]
        public DateTime date { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [ForeignKey("Applicant")]
        public int applicant_id { get; set; }
        public virtual Applicant Applicant { get; set; }

        [ForeignKey("Vehicle")]
        public int vehicle_id { get; set; }
        public virtual Vehicle Vehicle { get; set; }

        [ForeignKey("Officer")]
        public int officer_id { get; set; }
        public virtual Officer Officer { get; set; }
    }
}
