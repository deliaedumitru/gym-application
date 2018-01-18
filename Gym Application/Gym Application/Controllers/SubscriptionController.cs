using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DAL;
using DAL.Model;
using Business_Layer.Services;
using System.Web.Http.Cors;
using Business_Layer.DTO;
using Gym_Application.Authentication;

namespace Gym_Application.Controllers
{
    public class SubscriptionController : ApiController
    {

        private SubscriptionService service = new SubscriptionService();
        // GET: api/Subscription
        [Route("api/Subscriptions")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<SubscriptionModelView> GetSubcription()
        {
            return service.getAllSubscriptions();
        }

        // POST api/Subscription/Purchase
        [Route("api/Subscription/purchase")]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PurchaseSubscription( SubscriptionUserModelView su)
        {
            // users should not be able to perform destructive operations
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            service.purchaseSubscription(su);

            return StatusCode(HttpStatusCode.OK);
        }

        // GET: api/Subscription/5
        [ResponseType(typeof(Subcription))]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetSubcription(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            SubscriptionModelView subcription = service.getByID(id);
            if (subcription == null)
            {
                return NotFound();
            }

            return Ok(subcription);
        }

        // PUT: api/Subscription/5
        [ResponseType(typeof(void))]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PutSubcription(int id, SubscriptionModelView subscription)
        {
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subscription.Id)
            {
                return BadRequest();
            }


            try
            {
                service.updateSubscription(id, subscription);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubcriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/Subscription
        [ResponseType(typeof(SubscriptionModelView))]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostSubcription(SubscriptionModelView subscription)
        {
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = new SubscriptionService();
            service.addSubscription(subscription);
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/Subscription/5
        [ResponseType(typeof(SubscriptionModelView))]
        [JwtAuthentication]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult DeleteSubcription(int id)
        {
            if (!Utils.CheckPermission(new List<Role> { Role.USER, Role.ADMIN, Role.TRAINER }))
                return StatusCode(HttpStatusCode.Forbidden);

            SubscriptionModelView subscription = service.getByID(id);
            if (subscription == null)
            {
                return NotFound();
            }

            service.deleteSubscription(id);

            return Ok(subscription);
        }

        private bool SubcriptionExists(int id)
        {
            return service.getByID(id) != null;
        }
    }
}