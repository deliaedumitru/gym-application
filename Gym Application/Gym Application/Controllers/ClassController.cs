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

namespace Gym_Application.Controllers
{
    public class ClassController : ApiController
    {
        // POST: api/Class
        public IHttpActionResult PostClass([FromBody]ClassModelView classModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new ClassServices();
            BaseClassModelView model = service.addClass(classModel);
            return Ok(model);
        }

        // DELETE: api/Class/5
        public IHttpActionResult DeleteClass( int id )
        {
            var service = new ClassServices();
            try
            {
                BaseClassModelView model = service.deleteClass( id );
                return Ok(model);
            }
            catch (Exception e){
                return NotFound();
            }
        }


        [Route("api/classes")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpGet]
        public IQueryable<BaseClassModelView> GetClass()
        {
            var service = new ClassServices();
            return service.getAllClasses();
        }

        public BaseClassModelView GetClass( int id )
        {
            var service = new ClassServices();
            return service.getByID( id );
        }

    }
}
