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
        [Route( "api/{controller}/{id}/participants" )]
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