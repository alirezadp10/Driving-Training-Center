using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Question : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string title { get; set; }

        [Column(TypeName = "text")]
        public string options { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int correct_answer { get; set; }

        [ForeignKey("TheoryExam")]
        public int theory_exam_id { get; set; }
        public virtual TheoryExam TheoryExam { get; set; }
    }
}
