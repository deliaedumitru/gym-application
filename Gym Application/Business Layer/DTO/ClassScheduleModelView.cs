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
        public String Difficulty { get; set; }
        public String Room { get; set; }
    }

    public class ScheduleListPerDays
    {
        public List<ScheduleDetailsModelView> Monday { get; set; }
        public List<ScheduleDetailsModelView> Tuesday { get; set; }
        public List<ScheduleDetailsModelView> Wednesday { get; set; }
        public List<ScheduleDetailsModelView> Thursday { get; set; }
        public List<ScheduleDetailsModelView> Friday { get; set; }
        public List<ScheduleDetailsModelView> Saturday { get; set; }
        
        public ScheduleListPerDays()
        {
            Monday = new List<ScheduleDetailsModelView>();
            Tuesday = new List<ScheduleDetailsModelView>();
            Wednesday = new List<ScheduleDetailsModelView>();
            Thursday = new List<ScheduleDetailsModelView>();
            Friday = new List<ScheduleDetailsModelView>();
            Saturday = new List<ScheduleDetailsModelView>();
        }
    }
}
