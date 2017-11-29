using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business_Layer.DTO;
using DAL.Model;

namespace Business_Layer.Mappers
{
    class ClassScheduleMapper
    {
        public ScheduleDetailsModelView ScheduleToScheduleDetails(ClassSchedule schedule)
        {
            ScheduleDetailsModelView model = new ScheduleDetailsModelView();
            model.Capacity = schedule.Capacity;
            model.AvailableCapacity = schedule.AvailableCapacity;
            model.ClassId = schedule.ClassId;
            model.ClassName = schedule.Class.Name;
            model.Date = schedule.Date;
            model.Difficulty = ((Difficulty)schedule.Difficulty).ToString();
            model.Id = schedule.Id;
            model.TrainerId = schedule.TrainerId;
            model.TrainerName = schedule.Trainer.Name;
            model.Room = schedule.Room;
            model.DayOfWeek = schedule.Date.DayOfWeek.ToString();
            return model;
        }
    }
}
