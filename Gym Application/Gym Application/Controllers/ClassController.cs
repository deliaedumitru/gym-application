using Business_Layer.DTO;
using Business_Layer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using DAL.Model;
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class ClassController : ApiController
    {
        // POST: api/Class
        // ADD CLASS
        [Route( "api/Class" )]
        [JwtAuthentication]
        
        public IHttpActionResult PostClass([FromBody]ClassModelView classModel)
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new ClassServices();
            BaseClassModelView model = service.addClass(classModel);
            return Ok(model);
        }

        // DELETE: api/Class/5
        // DELETE CLASS
        [Route( "api/Class/{id}" )]
        [JwtAuthentication]
        [HttpDelete]
        public IHttpActionResult DeleteClass(int id)
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            var service = new ClassServices();
            try
            {
                BaseClassModelView model = service.deleteClass(id);
                return Ok(model);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        

        // GET ALL CLASSES
        [Route( "api/Class" )]
        [JwtAuthentication]
        [HttpGet]
        public IQueryable<BaseClassModelView> GetClass()
        {
            var service = new ClassServices();
            return service.getAllClasses();
        }

        // GET SINGLE CLASS
        
        [HttpGet]
        [Route( "api/Class/{id}" )]
        [JwtAuthentication]
        public IHttpActionResult GetClass( int id )
        {
            var service = new ClassServices();
            try
            {
                return Ok( service.getByID( id ) );
            }
            catch
            {
                return NotFound();
            }
        }

        // EDIT CLASS
        
        [HttpPut]
        [JwtAuthentication]
        [Route("api/Class/{id}")]
        public IHttpActionResult PutClass(int id, [FromBody]ClassModelView classModel)
        {
            // at least trainer
            if (!Utils.CheckPermission(new List<Role> { Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new ClassServices();
            BaseClassModelView basemodel = new BaseClassModelView();
            basemodel.Name = classModel.Name;
            basemodel.Id = id;
            try
            {
                BaseClassModelView model = service.editClass( basemodel );
                return Ok( model );
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
