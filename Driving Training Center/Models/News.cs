using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class News : BaseModel
    {
        public List<CategoryNews> Categories { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string title { get; set; }

        [Column(TypeName = "text")]
        public string content { get; set; }

        [Required]
        [Column(TypeName = "bit")]
        public bool slide { get; set; }

        [ForeignKey("Staff")]
        public int staff_id { get; set; }
        public virtual Staff Staff { get; set; }
    }
}
