using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class ScheduleTeacher : BaseModel
    {
        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [ForeignKey("Schedule")]
        public int schedule_id { get; set; }
        public virtual Schedule Schedule { get; set; }

        [ForeignKey("Teacher")]
        public int teacher_id { get; set; }
        public virtual Teacher Teacher { get; set; }
    }
}
