using Business_Layer.DTO;
using Business_Layer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DAL.Model;
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class FeedbackController : ApiController
    {
        [Route( "api/feedbacks/" )]
        [JwtAuthentication]
        [EnableCors( origins: "*", headers: "*", methods: "*" )]
        [HttpPost]
        public IHttpActionResult PostFeedack([FromBody]FeedbackModelView feedbackModel)
        {
            // at least user
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new FeedbackServices();
            BaseFeedbackModelView model = service.giveFeedback(feedbackModel);
            return Ok(model);
        }


        [Route("api/feedbacks/{id}")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IQueryable<BaseFeedbackModelView> GetClass(int id)
        {
            var service = new FeedbackServices();
            return service.getFeedbacksForTrainer(id);
        }

        [Route("api/feedbacks/{id}")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpPut]
        public IHttpActionResult UpdateFeedback(int id, [FromBody]FeedbackModelView feedbackModel)
        {
            // at least user
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var service = new FeedbackServices();
            try
            {
                return Ok(service.updateFeedback(id, feedbackModel));
            } catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        [Route("api/feedbacks/trainer/{trainerId}/user/{userId}/")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IHttpActionResult getFeedback(int trainerId, int userId)
        {
            var service = new FeedbackServices();
            try
            {
                BaseFeedbackModelView f = service.getFeedbackForTrainerFromUser(trainerId, userId);
                if (f == null)
                    return NotFound();
                else
                    return Ok(f);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

    }
}

