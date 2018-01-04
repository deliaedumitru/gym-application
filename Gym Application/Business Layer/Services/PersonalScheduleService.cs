using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repository;
using DAL.Model;
using Business_Layer.DTO;
using Business_Layer.Mappers;

namespace Business_Layer.Services
{
    public class PersonalScheduleService
    {
        private UnitOfWork UoW = new UnitOfWork();

        private bool ValidatePersonalSchedule(PersonalSchedule ps)
        {
            bool valid = true;
            IRepository<User> repository = UoW.Repository<User>();
            //User user = repository.GetById(ps.Id);
           // valid = valid && user != null;
            User participant = repository.GetById(ps.ParticipantId);
            valid = valid && participant != null && participant.Role == Role.USER;
            User trainer = repository.GetById(ps.TrainerId);
            valid = valid && trainer != null && trainer.Role == Role.TRAINER;
            valid = valid && ps.Date >= DateTime.Now;
            return valid;
        }

        public PersonalScheduleService() { }

        public PersonalSchedule Add(PersonalSchedule ps)
        {
            if (!ValidatePersonalSchedule(ps))
            {
                throw new InvalidOperationException("The object is not in a valid state.");
            }
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            repository.Save(ps);
            UoW.Save();
            return ps;
        }

        public PersonalSchedule Update(int id, PersonalSchedule ps)
        {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            PersonalSchedule old = repository.GetById(id);
            if (old != null)
            {
                old.Date = ps.Date;
                old.Room = ps.Room;
                old.TrainerId = ps.TrainerId;
                old.ParticipantId = ps.ParticipantId;
                //old.Participant = ps.Participant;
                //old.Trainer = ps.Trainer;
                if (!ValidatePersonalSchedule(old))
                {
                    throw new InvalidOperationException("The object is not in a valid state.");
                }
                repository.Update(old);
                UoW.Save();
            }
            else
            {
                throw new InvalidOperationException( "The requested Id is not valid" );
            }
            return ps;
        }

        public PersonalSchedule FindOne(int id)
        {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            /*IEnumerable<PersonalSchedule> ps = FindAll();
            foreach(PersonalSchedule p in ps)
            {
                if (p.TrainerId==id || p.ParticipantId == id)
                {
                    return p;
                }
            }
            return null;*/
            return repository.GetById(id);
        }

        public IEnumerable<PersonalSchedule> FindAll() {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            var res = repository.findAll();
            return res;
        }

        public List<PersonalScheduleView> FindAllFromRoom(String room)
        {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            IEnumerable<PersonalSchedule> all = repository.findAll();
            List<PersonalScheduleView> res = new List<PersonalScheduleView>();
            foreach(PersonalSchedule ps in all)
            {
                if (ps.Room.Equals(room))
                {
                    res.Add(PersonalScheduleMapper.ScheduleToScheduleDetails(ps));
                }
            }
            res = res.OrderBy(x => x.Date).ToList();
            return res;
        }

        public List<PersonalScheduleView> FindAllFromDate(DateTime date)
        {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            IEnumerable<PersonalSchedule> all = repository.findAll();
            List<PersonalScheduleView> res = new List<PersonalScheduleView>();
            foreach (PersonalSchedule ps in all)
            {
                if (ps.Date.Equals(date))
                {
                    res.Add(PersonalScheduleMapper.ScheduleToScheduleDetails(ps));
                }
            }
            res = res.OrderBy(x => x.Room).ToList();
            return res;
        }

        public List<PersonalScheduleView> FindFromDateAndTrainerId( int trainerId, DateTime startDate, DateTime stopDate )
        {
            IRepository<PersonalSchedule> repository = UoW.Repository<PersonalSchedule>();
            IEnumerable<PersonalSchedule> all = repository.findAll();
            List<PersonalScheduleView> res = new List<PersonalScheduleView>();
            foreach (PersonalSchedule ps in all)
            {
                if( ps.TrainerId == trainerId && ps.Date >= startDate && ps.Date <= stopDate )
                {
                    res.Add(PersonalScheduleMapper.ScheduleToScheduleDetails(ps));
                }
            }
            res = res.OrderBy(x => x.Date).ToList();
            return res;
        }

        public List<PersonalScheduleView> FindAllFrom(int userId)
        {
            IEnumerable<PersonalSchedule> all = UoW.Repository<PersonalSchedule>().findAll();
            List<PersonalScheduleView> result = new List<PersonalScheduleView>();
            User user = new User();
            user.Id = userId;
            foreach (PersonalSchedule schedule in all)
            {
                if (schedule.Participant.Id == userId)
                {
                    result.Add(PersonalScheduleMapper.ScheduleToScheduleDetails(schedule));
                }
            }
            result = result.OrderBy(x => x.Date).ToList();
            return result;

        }

        public List<PersonalScheduleView> FindAllFrom(int userId, DateTime start, DateTime end)
        {
            IEnumerable<PersonalSchedule> all = UoW.Repository<PersonalSchedule>().findAll();
            List<PersonalScheduleView> result = new List<PersonalScheduleView>();
            User user = new User();
            user.Id = userId;
            foreach (PersonalSchedule schedule in all)
            {
                if (start <= schedule.Date && schedule.Date <= end && schedule.Participant.Id == userId)
                {
                    result.Add(PersonalScheduleMapper.ScheduleToScheduleDetails(schedule));
                }
            }
            result = result.OrderBy(x => x.Date).ToList();
            return result;

        }

        public void Delete(int id)
        {
            IRepository<PersonalSchedule> repo = UoW.Repository<PersonalSchedule>();
            if (repo.GetById(id) != null)
            {
                repo.Delete(repo.GetById(id));
                UoW.Save();
            }
        }

        public void Dispose()
        {
            UoW.Dispose();
        }
    }
}
