using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class ApplicantTheoryExam : BaseModel
    {
        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [Column(TypeName = "int")]
        public int point { get; set; }

        [ForeignKey("Applicant")]
        public int applicant_id { get; set; }
        public virtual Applicant Applicant { get; set; }

        [ForeignKey("TheoryExam")]
        public int theory_exam_id { get; set; }
        public virtual TheoryExam TheoryExam { get; set; }
    }
}
