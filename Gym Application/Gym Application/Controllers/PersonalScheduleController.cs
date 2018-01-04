using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Http;
using System.Web.Http.Description;
using System.Net;
using DAL.Model;
using Business_Layer.DTO;
using Business_Layer.Services;
using Gym_Application.Models;

namespace Gym_Application.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]   
    public class PersonalScheduleController : ApiController
    {
        private PersonalScheduleService service = new PersonalScheduleService();
        //merge 
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/PersonalSchedules/")]
        [HttpGet]
        //[ResponseType(typeof(PersonalSchedule))]
        public IEnumerable<PersonalSchedule> GetPersonalSchedule()
        {
            return service.FindAll();
        }
        //merge 
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(PersonalScheduleView))]
        [Route("api/PersonalSchedules/{id}")]
        [HttpGet]
        public IHttpActionResult GetPersonalSchedule([FromUri] int id)
        {
            PersonalSchedule personalSchedule = service.FindOne(id);
            if (personalSchedule == null)
            {
                return NotFound();
            }

            return Ok(personalSchedule);
        }
        //merge
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/PersonalSchedules/details")]
        [ResponseType(typeof(IEnumerable<PersonalScheduleView>))]
        [HttpPost]
        public IHttpActionResult GetPersonalSchedulesDetails([FromBody] DateSpan dateSpan)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    List<PersonalScheduleView> result = service.FindAllFromDate(dateSpan.StartDate, dateSpan.EndDate);
                    return Ok(result);
                }
                else
                    return BadRequest();

            }
            catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult(e.Message, this);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }
        //merge
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/PersonalSchedules/update")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPersonalSchedule(int id, PersonalSchedule personalSchedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                service.Update(id, personalSchedule);
            }
            catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult(e.Message, this);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        //merge
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/PersonalSchedules/add")]
        [HttpPost]
        [ResponseType(typeof(PersonalSchedule))]
        public IHttpActionResult PostPersonalSchedule(PersonalSchedule personalSchedule)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                personalSchedule = service.Add(personalSchedule);
                //return Ok(ModelState);
                /*return CreatedAtRoute("DefaultApi", new
                {
                    id = personalSchedule.Id
                }, personalSchedule);*/
            }
            catch (Exception e)
            {
                return new System.Web.Http.Results.BadRequestErrorMessageResult(e.Message, this);
            }

           return CreatedAtRoute("DefaultApi", new
            {
                id = personalSchedule.Id
            }, personalSchedule);
        }
        //merge
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(void))]
        [Route("api/PersonalSchedules/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult DeletePersonalSchedule(int id)
        {
            service.Delete(id);
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                service.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonalScheduleExists(int id)
        {
            return (service.FindOne(id) != null);
        }
    }
}