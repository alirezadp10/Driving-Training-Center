using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class PracticalCourse : BaseModel
    {
        public List<SchedulePracticalCourse> Schedules { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int total_sessions { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime start_date { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string license_type { get; set; }

        [ForeignKey("Applicant")]
        public int applicant_id { get; set; }
        public virtual Applicant Applicant { get; set; }

        [ForeignKey("Teacher")]
        public int teacher_id { get; set; }
        public virtual Teacher Teacher { get; set; }
    }
}
