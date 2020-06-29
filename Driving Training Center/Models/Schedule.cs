using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Schedule : BaseModel
    {
        public List<ScheduleTeacher> Teachers { get; set; }
        
        public List<SchedulePracticalCourse> PracticalCourses { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string day { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string from { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string until { get; set; }
    }
}
