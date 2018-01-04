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
        public static PersonalScheduleView ScheduleToScheduleDetails( PersonalSchedule schedule )
        {
            PersonalScheduleView model = new PersonalScheduleView();
            model.Date = schedule.Date;
            model.Room = schedule.Room;
            model.ParticipantId = schedule.ParticipantId;
            model.TrainerId = schedule.TrainerId;
            model.Id = schedule.Id;
            return model;
        }

    }
}
