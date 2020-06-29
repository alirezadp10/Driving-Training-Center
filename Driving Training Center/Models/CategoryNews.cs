using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer
{
    public class CategoryNews : BaseModel
    {
        [ForeignKey("News")]
        public int news_id { get; set; }
        public virtual News News { get; set; }

        [ForeignKey("Category")]
        public int category_id { get; set; }
        public virtual Category Category { get; set; }
    }
}
