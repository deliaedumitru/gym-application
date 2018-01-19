using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.DTO
{
    public class PersonalScheduleView
    {
        public DateTime Date { get; set; }
        public string Room { get; set; }
        public int ParticipantId { get; set; }
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public int Id { get; set; }
        public String DayOfWeek { get; set; }
        public String numeParticipant { get; set; }
    }
}
