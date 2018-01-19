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
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class TrainersController : ApiController
    {
        private TrainerService service = new TrainerService();

        [HttpGet]
        [Route("api/trainers")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<BaseUserModelView> getTrainers()
        {
            //default permissions for get
            return service.GetTrainers()
               .Select(e => UserMapper.UserToBaseUserMV(e));
        }
        

        [HttpPost]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult AddTrainer(int id)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (service.AddTrainer(id))
                return Ok();

            return NotFound();
        }

        [HttpDelete]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult DeleteTrainer(int id)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (service.DeleteTrainer(id))
                return Ok();

            return NotFound();
        }

        [HttpGet]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
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
