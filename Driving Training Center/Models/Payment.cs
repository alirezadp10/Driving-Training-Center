using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Payment : BaseModel
    {
        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [ForeignKey("Applicant")]
        public int applicant_id { get; set; }
        public virtual Applicant Applicant { get; set; }

        [ForeignKey("License")]
        public int license_id { get; set; }
        public virtual License License { get; set; }
    }
}
