using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Lesson : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string title { get; set; }

        [Column(TypeName = "text")]
        public string content { get; set; }

        [ForeignKey("TheoryCourse")]
        public int theory_course_id { get; set; }
        public virtual TheoryCourse TheoryCourse { get; set; }
    }
}
