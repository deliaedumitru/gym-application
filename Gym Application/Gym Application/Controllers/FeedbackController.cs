using Business_Layer.DTO;
using Business_Layer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Gym_Application.Controllers
{
    public class FeedbackController : ApiController
    {
        [Route( "api/feedbacks/" )]
        [EnableCors( origins: "*", headers: "*", methods: "*" )]
        [HttpPost]
        public IHttpActionResult PostFeedack([FromBody]FeedbackModelView feedbackModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new FeedbackServices();
            BaseFeedbackModelView model = service.giveFeedback(feedbackModel);
            return Ok(model);
        }


        [Route("api/feedbacks/{id}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IQueryable<BaseFeedbackModelView> GetClass(int id)
        {
            var service = new FeedbackServices();
            return service.getFeedbacksForTrainer(id);
        }

    }
}

