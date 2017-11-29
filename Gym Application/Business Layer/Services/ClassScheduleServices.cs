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
    public class ClassScheduleServices
    {
        private UnitOfWork UoW = new UnitOfWork();

        private bool validateClassSchedule( ClassSchedule cs )
        {
            bool valid = true;
            IRepository<Class> Crepo = UoW.Repository<Class>();
            IRepository<User> Urepo = UoW.Repository<User>();

            valid = valid && ( Crepo.GetById( cs.ClassId ) != null );
            valid = valid && ( ( Urepo.GetById( cs.TrainerId ) != null ) && ( Urepo.GetById( cs.TrainerId ).Role == Role.TRAINER ) );
            valid = valid && ( cs.Capacity > 0 );
            valid = valid && ( cs.AvailableCapacity >= 0 );

            return valid;
        }

        public ClassScheduleServices()
        {
        }

        public ClassSchedule add( ClassSchedule cs )
        {
            cs.AvailableCapacity = cs.Capacity;
            if( !validateClassSchedule( cs ) )
            {
                throw new InvalidOperationException( "The object is not in a valid state." );
            }
            IRepository<ClassSchedule> repo = UoW.Repository<ClassSchedule>();
            repo.Save( cs );
            UoW.Save();
            return cs;
        }

        public ClassSchedule update( int id, ClassSchedule cs )
        {
            if( cs.Id != id )
            {
                throw new InvalidOperationException( "The IDs of the new object and the old one's are not the same" );
            }
            IRepository<ClassSchedule> repo = UoW.Repository<ClassSchedule>();
            ClassSchedule old = repo.GetById( id );
            if( old == null )
            {
                throw new InvalidOperationException( "The given ID doesn't have an entry in the DB" );
            }
            if( old.Capacity - old.AvailableCapacity > cs.Capacity )
            {
                throw new InvalidOperationException( "The new capacity is less that the current number of enrolled users" );
            }

            old.AvailableCapacity = cs.Capacity - ( old.Capacity - old.AvailableCapacity );
            old.Capacity = cs.Capacity;
            old.Date = cs.Date;
            old.Difficulty = cs.Difficulty;
            old.Room = cs.Room;
            old.TrainerId = cs.TrainerId;
            old.Trainer = UoW.Repository<User>().GetById( cs.TrainerId );
            if( !validateClassSchedule( old ) )
            {
                throw new InvalidOperationException( "The object is not in a valid state." );
            }
            repo.Update( old );
            UoW.Save();
            return cs;
        }

        public IEnumerable<ClassSchedule> findAll()
        {
            IRepository<ClassSchedule> repo = UoW.Repository<ClassSchedule>();
            var ret = repo.findAll();
            return ret;
        }


        public List<ScheduleDetailsModelView> findAllFrom(DateTime start, DateTime end)
        {
            ClassScheduleMapper mapper = new ClassScheduleMapper();
            IEnumerable<ClassSchedule> all = UoW.Repository<ClassSchedule>().findAll();
            List<ScheduleDetailsModelView> result = new List<ScheduleDetailsModelView>();
            foreach(ClassSchedule schedule in all )
            {
                if( start <= schedule.Date && schedule.Date <= end )
                {
                    result.Add(mapper.ScheduleToScheduleDetails(schedule));
                }
            }
            result = result.OrderBy(x => x.Date).ToList();
            return result;
            
        }

        public ClassSchedule findOne( int id )
        {
            IRepository<ClassSchedule> repo = UoW.Repository<ClassSchedule>();
            var ret = repo.GetById( id );
            return ret;
        }

        public void enrollUser( int user_id, int cs_id )
        {
            IRepository<ClassSchedule> CSrepo = UoW.Repository<ClassSchedule>();
            IRepository<User> Urepo = UoW.Repository<User>();

            ClassSchedule classSchedule = CSrepo.GetById( cs_id );
            User user = Urepo.GetById( user_id );

            if( ( user == null ) || ( classSchedule == null ) )
            {
                throw new InvalidOperationException( "User or ClassSchedule id is not valid." );
            }

            if( user.Role != Role.USER )
            {
                throw new InvalidOperationException( "User must have role of regular user, not trainer/admin." );
            }

            if( classSchedule.ClassParticipants.Count < classSchedule.Capacity )
            {
                classSchedule.ClassParticipants.Add( user );
                classSchedule.AvailableCapacity = classSchedule.AvailableCapacity - 1;
                CSrepo.Update( classSchedule );
                UoW.Save();
            }
            else
            {
                throw new InvalidOperationException( "All positions are filled." );
            }
        }

        public void unenrollUser( int user_id, int cs_id )
        {
            IRepository<ClassSchedule> CSrepo = UoW.Repository<ClassSchedule>();
            IRepository<User> Urepo = UoW.Repository<User>();

            ClassSchedule classSchedule = CSrepo.GetById( cs_id );
            User user = Urepo.GetById( user_id );

            if( ( user == null ) || ( classSchedule == null ) )
            {
                throw new InvalidOperationException( "User or ClassSchedule id is not valid." );
            }

            if( user.Role != Role.USER )
            {
                throw new InvalidOperationException( "User must have role of regular user, not trainer/admin." );
            }

            classSchedule.ClassParticipants.Remove( user );
            classSchedule.AvailableCapacity = classSchedule.AvailableCapacity + 1;
            CSrepo.Update( classSchedule );

            UoW.Save();
            
        }

        public void delete( int id )
        {
            IRepository<ClassSchedule> repo = UoW.Repository<ClassSchedule>();
            if( repo.GetById( id ) != null )
            {
                repo.Delete( repo.GetById( id ) );
                UoW.Save();
            }
        }

        public void Dispose()
        {
            UoW.Dispose();
        }
    }
}
