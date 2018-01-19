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

using System.Net.Mail;
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{

    using DAL.Repository;


    
    public class ClassSchedulesController : ApiController
    {
        private ClassScheduleServices service = new ClassScheduleServices();

        // GET: api/ClassSchedules
        
        [Route("api/ClassSchedules")]
        [JwtAuthentication]
        [HttpGet]
        public IEnumerable<ClassSchedule> GetClassSchedule()
        {
            return service.findAll();
        }

        // GET: api/ClassSchedules/5
        
        [ResponseType( typeof( ClassSchedule ) )]
        [JwtAuthentication]
        public IHttpActionResult GetClassSchedule( int id )
        {
            ClassSchedule classSchedule = service.findOne( id );
            if( classSchedule == null )
            {
                return NotFound();
            }

            return Ok( classSchedule );
        }

        //GET CLASS SCHEDULE !!!!! FFS
        // TODO: MAKE IT GET
        // POST: api/ClassSchedules/details
        [Route("api/ClassSchedules/details")]
        [JwtAuthentication]
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
        
        // POST: api/ClassSchedules/trainers/{id}
        
        [Route("api/ClassSchedules/trainers/{id}")]
        [JwtAuthentication]
        [HttpPost]
        public IHttpActionResult GetTrainerScheduleDetails([FromBody] DateSpan dateSpan,int id)
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            try
            {
                if (ModelState.IsValid)
                {
                    List<ScheduleDetailsModelView> result = service.findAllFromTrainer(dateSpan.StartDate, dateSpan.EndDate,id);
                    return Ok(result);
                }
                else
                    return BadRequest();

            }
            catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult(e.Message, this);
            }
        }

        // GET: api/ClassSchedules/5/participants
        
        [ResponseType( typeof( IEnumerable<int> ) )]
        [Route( "api/ClassSchedules/{id}/participants" )]
        [JwtAuthentication]
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
        
        [ResponseType( typeof( void ) )]
        [JwtAuthentication]
        public IHttpActionResult PutClassSchedule( int id, ClassSchedule classSchedule )
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if ( !ModelState.IsValid )
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
        [HttpPost]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        [JwtAuthentication]
        public IHttpActionResult PostClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            // at least user
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if ( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            try
            {
                Console.WriteLine("enrolling");
                service.enrollUser(id_user, id_class_schedule);
                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception e)
            {
                var trace = e.StackTrace;
                Console.WriteLine(trace);

                var result = new System.Web.Http.Results.BadRequestErrorMessageResult(e.Message, this);
                return result;
            }
        }

        // DELETE: api/ClassSchedules/{id}/participants/{id_user}   -   unenroll from class schedule
        
        [ResponseType( typeof( void ) )]
        [HttpGet]
        [Route( "api/ClassSchedules/{id_class_schedule}/participants/{id_user}" )]
        [JwtAuthentication]
        public IHttpActionResult DeleteClassScheduleParticipants( int id_class_schedule, int id_user )
        {
            // at least user
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if ( !ModelState.IsValid )
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
        [Route("api/ClassSchedules")]
        [JwtAuthentication]
        public IHttpActionResult PostClassSchedule( ClassSchedule classSchedule )
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if ( !ModelState.IsValid )
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
        [JwtAuthentication]
        public IHttpActionResult DeleteClassSchedule( int id )
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

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
