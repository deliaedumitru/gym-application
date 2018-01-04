using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business_Layer.DTO;
using DAL.Model;

namespace Business_Layer.Mappers
{
    public class PersonalScheduleMapper
    {
        public PersonalScheduleView ScheduleToScheduleDetails(PersonalSchedule schedule)
        {
            PersonalScheduleView model = new PersonalScheduleView();
            model.Date = schedule.Date;
            model.Room = schedule.Room;
            return model;
        }
    }
}
