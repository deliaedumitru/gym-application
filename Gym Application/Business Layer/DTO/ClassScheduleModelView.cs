using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model;

namespace Business_Layer.DTO
{
    public class ScheduleDetailsModelView
    {
        public int Id { get; set; }
        public int ClassId { get; set; }
        public String ClassName { get; set; }
        public int TrainerId { get; set; }
        public String TrainerName { get; set; }
        public DateTime Date { get; set; }
        public int? Capacity { get; set; }
        public int? AvailableCapacity { get; set; }
        public String Difficulty { get; set; }
        public String Room { get; set; }
        public String DayOfWeek { get; set; }
    }
}
