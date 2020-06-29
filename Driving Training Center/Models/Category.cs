using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class Category : BaseModel
    {
        public List<CategoryNews> News { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string name { get; set; }
    }
}
