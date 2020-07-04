using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataLayer
{
    public class Applicant : BaseModel
    {
        [JsonIgnore]
        public string password { get; set; }

        public List<ApplicantTheoryExam> TheoryExams { get; set; }

        public List<Payment> Licenses { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string first_name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string last_name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string gender { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string father_name { get; set; }

        //[Index(IsUnique = true)]
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string national_code { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime birthdate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string phone { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string education { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string blood_type { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string status { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string postal_code { get; set; }
    }
}