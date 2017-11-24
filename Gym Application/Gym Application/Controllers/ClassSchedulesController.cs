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
using Business_Layer.Services;
using System.Web.Http.Cors;

namespace Gym_Application.Controllers
{
    public class ClassSchedulesController : ApiController
    {
        private ClassScheduleServices service = new ClassScheduleServices();
        
        // GET: api/ClassSchedules
        public IEnumerable<ClassSchedule> GetClassSchedule()
        {
            return service.findAll();
        }

        // GET: api/ClassSchedules/5
        [ResponseType( typeof( ClassSchedule ) )]
        public IHttpActionResult GetClassSchedule( int id )
        {
            ClassSchedule classSchedule = service.findOne( id );
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
            ClassSchedule classSchedule = service.findOne( id );
            if( classSchedule == null )
            {
                return NotFound();
            }
            IEnumerable<IdContainer> CIds = from sch in classSchedule.ClassParticipants
                                            select new IdContainer( sch.Id );

            return Ok( CIds );
        }

        // PUT: api/ClassSchedules/5
        [ResponseType( typeof( void ) )]
        public IHttpActionResult PutClassSchedule( int id, ClassSchedule classSchedule )
        {
            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            try
            {
                service.update( id, classSchedule );
            }
            catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult( e.Message, this );
            }

            return StatusCode( HttpStatusCode.NoContent );
        }

        // POST: api/ClassSchedules/{id}/participants/{id_user}   -   sign up for class schedule
        [ResponseType( typeof( void ) )]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        public IHttpActionResult PostClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            try
            {
                service.enrollUser( id_user, id_class_schedule );
                return StatusCode( HttpStatusCode.Created );
            }
            catch( Exception e )
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult( e.Message, this );
            }

        }

        // DELETE: api/ClassSchedules/{id}/participants/{id_user}   -   unenroll from class schedule
        [ResponseType( typeof( void ) )]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        public IHttpActionResult DeleteClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            try
            {
                service.unenrollUser( id_user, id_class_schedule );
                return StatusCode( HttpStatusCode.NoContent );
            }
            catch( Exception e )
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult( e.Message, this );
            }

        }

        // POST: api/ClassSchedules
        [ResponseType( typeof( ClassSchedule ) )]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostClassSchedule( ClassSchedule classSchedule )
        {

            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            try
            {
                classSchedule = service.add( classSchedule );
            }
            catch(Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult( e.Message, this );
            }

            return CreatedAtRoute( "DefaultApi", new
            {
                id = classSchedule.Id
            }, classSchedule );
        }

        // DELETE: api/ClassSchedules/5
        [ResponseType( typeof( void ) )]
        public IHttpActionResult DeleteClassSchedule( int id )
        {
            service.delete( id );
            return Ok();
        }

        protected override void Dispose( bool disposing )
        {
            if( disposing )
            {
                service.Dispose();
            }
            base.Dispose( disposing );
        }

        private bool ClassScheduleExists( int id )
        {
            return ( service.findOne( id ) != null );
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