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
using Gym_Application.Models;
using Business_Layer.DTO;

namespace Gym_Application.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClassSchedulesController : ApiController
    {
        private ClassScheduleServices service = new ClassScheduleServices();

        // GET: api/ClassSchedules
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<ClassSchedule> GetClassSchedule()
        {
            return service.findAll();
        }

        // GET: api/ClassSchedules/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        // POST: api/ClassSchedules/details
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/ClassSchedules/details")]
        [HttpPost]
        public IHttpActionResult GetClassSchedulesDetails([FromBody] DateSpan dateSpan)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    List<ScheduleDetailsModelView> result = service.findAllFrom(dateSpan.StartDate, dateSpan.EndDate);
                    return Ok(result);
                }
                else
                    return BadRequest();

            } catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult( e.Message, this );
            }
        }

        // GET: api/ClassSchedules/5/participants
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType( typeof( IEnumerable<int> ) )]
        [Route( "api/ClassSchedules/{id}/participants" )]
        public IHttpActionResult GetClassScheduleParticipants( int id )
        {
            ClassSchedule classSchedule = service.findOne( id );
            if( classSchedule == null )
            {
                return NotFound();
            }
            IEnumerable<int> CIds = from sch in classSchedule.ClassParticipants
                                    select sch.Id;

            return Ok( CIds );
        }

        // PUT: api/ClassSchedules/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType( typeof( void ) )]
        [HttpPost]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType( typeof( void ) )]
        [HttpGet]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType( typeof( ClassSchedule ) )]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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
}