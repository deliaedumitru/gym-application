using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Business_Layer.DTO;
using Business_Layer.Services;
using System.Web.Http.Cors;

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
            catch (Exception)
            {
                return NotFound();
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
                return Ok(account);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
