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
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class UsersController : ApiController
    {
        //creeaza si salveaza un nou account
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]LoginModelView model)
        {
            try
            {
                var service = new UserServices();
                BaseUserModelView account = service.GetOneAccountWithPassword(model);
                HttpContext.Current.Response.AppendHeader("Authorization", "Bearer " + JwtManager.GenerateToken(model.Username));
                return Ok(account);
            }
            catch (Exception)
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
            var user = Utils.GetCurrentUser(); // this is just a demo
            if(user == null)
                return NotFound(); // return 404 if not logged in

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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IHttpActionResult EnrolledClasses(int id_user)
        {
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
    }
}
