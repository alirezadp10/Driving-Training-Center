using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Session : BaseModel
    {
        [Required]
        [Column(TypeName = "date")]
        public DateTime date { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string description { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string zone { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string street { get; set; }

        [Required]
        [Column(TypeName = "bit")]
        public bool attendance { get; set; }

        [ForeignKey("PracticalCourse")]
        public int practical_course_id { get; set; }
        public virtual PracticalCourse PracticalCourse { get; set; }

        [ForeignKey("Vehicle")]
        public int vehicle_id { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
