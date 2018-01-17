using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.DTO
{
    public class SubscriptionModelView
    {
        public int Id { get; set; } 
        public String Name { get; set; }
        public double Price { get; set; }
    }
}
