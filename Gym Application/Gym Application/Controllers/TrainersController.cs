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
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class TrainersController : ApiController
    {
        private UnitOfWork transaction_manager = new UnitOfWork();


        [HttpGet]
        [Route("api/trainers")]
        [JwtAuthentication]
        
        public IEnumerable<BaseUserModelView> getTrainers()
        {
            //default permissions for get
            IRepository<User> user_repo = transaction_manager.Repository<User>();
            IEnumerable<User> users = user_repo.findAll();
            List<BaseUserModelView> trainers = new List<BaseUserModelView>();
            foreach(User user in users)
            {
                if( user.Role == Role.TRAINER )
                    trainers.Add( UserMapper.UserToBaseUserMV( user ) );
            }

            return trainers;
        }

        [HttpPut]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        public IHttpActionResult EditTrainer(int id)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> {Role.ADMIN, Role.TRAINER}))
                return StatusCode(HttpStatusCode.Forbidden);

            IRepository<User> user_repo = transaction_manager.Repository<User>();
            User found_user = user_repo.GetById(id);
            bool found = found_user != null,
                is_trainer = found && found_user.Role == Role.TRAINER;

            if( is_trainer )
            {
                // what can we edit?
                // we'll see later, I guess
            }

            transaction_manager.Dispose();

            if (found && found_user.Role == Role.TRAINER)
                return Ok();

            return NotFound();
        }

        [HttpPost]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        public IHttpActionResult AddTrainer(int id)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            IRepository<User> user_repo = transaction_manager.Repository<User>();
            User found_user = user_repo.GetById(id);
            bool found = found_user != null, 
                is_normal_user = found && found_user.Role == Role.USER;

            // If we found the user, mark him as a trainer
            // Do this only if it is a normal user. We do not want people demoting admins
            if( is_normal_user )
            {
                found_user.Role = Role.TRAINER;
                user_repo.Update(found_user);
                transaction_manager.Save();
            }

            transaction_manager.Dispose();

            if( is_normal_user )
                return Ok();

            return NotFound();
        }

        [HttpDelete]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        public IHttpActionResult DeleteTrainer(int id)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            IRepository<User> user_repo = transaction_manager.Repository<User>();
            User found_user = user_repo.GetById(id);
            bool found = found_user != null, 
                is_trainer = found && found_user.Role == Role.TRAINER;

            // If we found the user, mark him as a normal user
            // Do this only if it is a trainer. We do not want people demoting admins
            if( is_trainer )
            {
                found_user.Role = Role.USER;
                user_repo.Update(found_user);
                transaction_manager.Save();
            }

            transaction_manager.Dispose();

            if( is_trainer )
                return Ok();

            return NotFound();
        }

        [HttpGet]
        [Route("api/trainers/{id}")]
        [JwtAuthentication]
        
        public IHttpActionResult getTrainer(int id)
        {
            IRepository<User> user_repo = transaction_manager.Repository<User>();
            User user = user_repo.GetById(id);
            if (user!= null && user.Role == Role.TRAINER)
            {
                user.ClassForTrainer = user.ClassForTrainer;
                return Ok(UserMapper.UserToDetailedTrainerUserMV(user));
            } else
            {
                return NotFound();
            }
        }
    }


}
