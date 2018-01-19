using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using Business_Layer.DTO;
using Business_Layer.Services;
using System.Web.Http.Cors;
using DAL.Model;
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class UsersController : ApiController
    {
        //creeaza si salveaza un nou account
        [Route("api/users")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]RegistrationModelView account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var service = new UserServices();
                    BaseUserModelView model = service.CreateAccount(account);
                    return Ok(model);
                }
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, e.Message));
            }
        }

        //returns the user with username & password BaseAccountModelView
        [Route("api/users/login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]LoginModelView model)
        {
            try
            {
                var service = new UserServices();
                var token = JwtManager.GenerateToken(model.Username); // get the token

                var baseView = service.GetOneAccountWithPassword(model);
                var tokenView = new UserModelWithTokenView
                {
                    Id = baseView.Id,
                    Name = baseView.Name,
                    Role = baseView.Role,
                    Username = baseView.Username,
                    Token = token, // add the token to the response
                };
                return Ok(tokenView);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        
        /// <summary>
        /// Endpoint to check your current identity
        /// Useful for checking validity of authentication token
        /// </summary>
        /// <returns></returns>
        [Route("api/users/me")]
        [JwtAuthentication]
        [HttpGet]
        public IHttpActionResult GetSelf()
        {
            // return forbidden if not logged in
            if (!Utils.CheckPermission())
                return StatusCode(HttpStatusCode.Forbidden);

            var user = Utils.GetCurrentUser(); // this is just a demo

            // otherwise return the current user
            return Ok(new BaseUserModelView {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Role = (int) user.Role
            });
        }

        //returns the classes for which the user is enrolled
        [Route("api/users/{id_user}/enrolledClasses")]
        
        [JwtAuthentication]
        [HttpGet]
        public IHttpActionResult EnrolledClasses(int id_user)
        {
            // check for permissions first thing
            try
            {
                var service = new UserServices();
                return Ok(service.EnrolledClassesIds(id_user));
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        //returns the classes for which the user is enrolled
        [Route("api/users")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {
            try
            {
                var service = new UserServices();
                return Ok(service.GetAllUsers());
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
