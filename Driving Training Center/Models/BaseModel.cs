using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class BaseModel
    {
        [Key]
        [Column(Order = 1)]
        public int id { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime created_at { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime updated_at { get; set; } = DateTime.Now;
    }
}
