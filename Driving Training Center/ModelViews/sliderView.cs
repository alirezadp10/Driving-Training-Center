using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Driving_Training_Center
{
    public class sliderView
    {
        [Required]
        public int id { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string image { get; set; }
    }
}
