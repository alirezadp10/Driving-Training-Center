using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Image : BaseModel
    {
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string imageable_type { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int imageable_id { get; set; }

        [Required]
        [Column(TypeName = "varchar(max)")]
        public string name { get; set; }

    }
}
