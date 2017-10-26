﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Business_Layer.DTO;
using Business_Layer.Services;

namespace Gym_Application.Controllers
{
    public class UsersController : ApiController
    {
        //creeaza si salveaza un nou account
        [Route("api/{controller}")]
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
    }
}
