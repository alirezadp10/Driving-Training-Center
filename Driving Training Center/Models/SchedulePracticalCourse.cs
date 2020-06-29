using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class SchedulePracticalCourse : BaseModel
    {
        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [ForeignKey("Schedule")]
        public int schedule_id { get; set; }
        public virtual Schedule Schedule { get; set; }

        [ForeignKey("PracticalCourse")]
        public int practical_course_id { get; set; }
        public virtual PracticalCourse PracticalCourse { get; set; }
    }
}
