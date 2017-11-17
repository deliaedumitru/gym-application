using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.DTO
{
    public class ClassModelView
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }

    public class BaseClassModelView
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
