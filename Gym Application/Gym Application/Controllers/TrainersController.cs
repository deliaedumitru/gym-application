using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DAL.Repository;
using DAL.Model;
using Business_Layer.DTO;
using Business_Layer.Mappers;
using Business_Layer.Services;

namespace Gym_Application.Controllers
{
    public class TrainersController : ApiController
    {
        private TrainerService service = new TrainerService();

        [HttpGet]
        [Route("api/trainers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<BaseUserModelView> getTrainers()
        {
            return service.GetTrainers()
                .Select(e => UserMapper.UserToBaseUserMV(e));
        }

        [HttpPost]
        [Route("api/trainers/{id}")]
        public IHttpActionResult AddTrainer(int id)
        {
            if (service.AddTrainer(id))
                return Ok();

            return NotFound();
        }

        [HttpDelete]
        [Route("api/trainers/{id}")]
        public IHttpActionResult DeleteTrainer(int id)
        {
            if (service.DeleteTrainer(id))
                return Ok();

            return NotFound();
        }

        [HttpGet]
        [Route("api/trainers/{id}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult getTrainer(int id)
        {
            User user = service.GetTrainer(id);

            if (user == null)
                return NotFound();

            return Ok(UserMapper.UserToDetailedTrainerUserMV(user));
        }
    }
}
