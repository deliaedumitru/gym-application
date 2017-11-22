using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DAL;
using DAL.Model;

namespace Gym_Application.Controllers
{
    public class ClassSchedulesController : ApiController
    {
        private GymDBContext db = new GymDBContext();
        
        // GET: api/ClassSchedules
        public IQueryable<ClassSchedule> GetClassSchedule()
        {
            return db.ClassSchedule;
        }

        // GET: api/ClassSchedules/5
        [ResponseType( typeof( ClassSchedule ) )]
        public IHttpActionResult GetClassSchedule( int id )
        {
            ClassSchedule classSchedule = db.ClassSchedule.Find( id );
            if( classSchedule == null )
            {
                return NotFound();
            }

            return Ok( classSchedule );
        }

        // GET: api/ClassSchedules/5/participants
        [ResponseType( typeof( IEnumerable<IdContainer> ) )]
        [Route( "api/ClassSchedules/{id}/participants" )]
        public IHttpActionResult GetClassScheduleParticipants( int id )
        {
            ClassSchedule classSchedule = db.ClassSchedule.Find( id );
            if( classSchedule == null )
            {
                return NotFound();
            }
            IEnumerable<IdContainer> CIds;

            CIds = from sch in classSchedule.ClassParticipants
                   select new IdContainer( sch.Id );

            return Ok( CIds );
        }

        // PUT: api/ClassSchedules/5
        [ResponseType( typeof( void ) )]
        public IHttpActionResult PutClassSchedule( int id, ClassSchedule classSchedule )
        {
            if( !validateClassSchedule( classSchedule ) )
            {
                return InternalServerError( new Exception( "Invalid fields in object!" ) );
            }
            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            if( id != classSchedule.Id )
            {
                return BadRequest();
            }

            db.Entry( classSchedule ).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch( DbUpdateConcurrencyException )
            {
                if( !ClassScheduleExists( id ) )
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode( HttpStatusCode.NoContent );
        }

        // POST: api/ClassSchedules/{id}/participants/{id_user}   -   sign up for class schedule
        [ResponseType( typeof( void ) )]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        public IHttpActionResult PostClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            ClassSchedule classSchedule = db.ClassSchedule.Find( id_class_schedule );
            User user = db.Users.Find( id_user );

            if( ( classSchedule == null ) || ( user == null ) )
            {
                return NotFound();
            }

            if( user.Role != Role.USER )
            {
                return StatusCode( HttpStatusCode.PreconditionFailed );
            }

            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            if( classSchedule.ClassParticipants.Count < classSchedule.Capacity )
            {
                classSchedule.ClassParticipants.Add( user );

                db.Entry( classSchedule ).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch( DbUpdateConcurrencyException )
                {
                    if( !ClassScheduleExists( id_class_schedule ) )
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return StatusCode( HttpStatusCode.Created );
            }
            else
            {
                return StatusCode( HttpStatusCode.PreconditionFailed );
            }

        }

        // DELETE: api/ClassSchedules/{id}/participants/{id_user}   -   unenroll from class schedule
        [ResponseType( typeof( void ) )]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        public IHttpActionResult DeleteClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            ClassSchedule classSchedule = db.ClassSchedule.Find( id_class_schedule );
            User user = db.Users.Find( id_user );

            if( classSchedule == null )
            {
                return NotFound();
            }

            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            if( classSchedule.ClassParticipants.Contains( user ) )
            {
                classSchedule.ClassParticipants.Remove( user );

                db.Entry( classSchedule ).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch( DbUpdateConcurrencyException )
                {
                    if( !ClassScheduleExists( id_class_schedule ) )
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return StatusCode( HttpStatusCode.NoContent );
            }
            else
            {
                return NotFound();
            }

        }

        // POST: api/ClassSchedules
        [ResponseType( typeof( ClassSchedule ) )]
        public IHttpActionResult PostClassSchedule( ClassSchedule classSchedule )
        {
            if( !validateClassSchedule( classSchedule ) )
            {
                return InternalServerError( new Exception( "Invalid fields in object!" ) );
            }

            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            db.ClassSchedule.Add( classSchedule );

            try
            {
                db.SaveChanges();
            }
            catch( DbUpdateException )
            {
                if( ClassScheduleExists( classSchedule.Id ) )
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute( "DefaultApi", new
            {
                id = classSchedule.Id
            }, classSchedule );
        }

        // DELETE: api/ClassSchedules/5
        [ResponseType( typeof( ClassSchedule ) )]
        public IHttpActionResult DeleteClassSchedule( int id )
        {
            ClassSchedule classSchedule = db.ClassSchedule.Find( id );
            if( classSchedule == null )
            {
                return NotFound();
            }

            db.ClassSchedule.Remove( classSchedule );
            db.SaveChanges();

            return Ok( classSchedule );
        }



        protected override void Dispose( bool disposing )
        {
            if( disposing )
            {
                db.Dispose();
            }
            base.Dispose( disposing );
        }

        private bool ClassScheduleExists( int id )
        {
            return db.ClassSchedule.Count( e => e.Id == id ) > 0;
        }

        private bool validateClassSchedule(ClassSchedule cs)
        {
            bool valid = true;
            valid = valid && ( db.Class.Find( cs.ClassId ) != null );
            valid = valid && ( ( db.Users.Find( cs.TrainerId ) != null ) && ( db.Users.Find( cs.TrainerId ).Role == Role.TRAINER ) );
            return valid;
        }
    }

    class IdContainer
    {
        public int Id { get; set; }
        public IdContainer( int id )
        {
            Id = id;
        }
    }
}