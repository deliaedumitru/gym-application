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

namespace Gym_Application.Controllers
{
    public class SubscriptionController : ApiController
    {
        private GymDBContext db = new GymDBContext();

        // GET: api/Subscription
        public IQueryable<Subcription> GetSubcription()
        {
            return db.Subcription;
        }

        // GET: api/Subscription/5
        [ResponseType(typeof(Subcription))]
        public IHttpActionResult GetSubcription(int id)
        {
            Subcription subcription = db.Subcription.Find(id);
            if (subcription == null)
            {
                return NotFound();
            }

            return Ok(subcription);
        }

        // PUT: api/Subscription/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSubcription(int id, Subcription subcription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subcription.Id)
            {
                return BadRequest();
            }

            db.Entry(subcription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Subscription
        [ResponseType(typeof(Subcription))]
        public IHttpActionResult PostSubcription(Subcription subcription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Subcription.Add(subcription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = subcription.Id }, subcription);
        }

        // DELETE: api/Subscription/5
        [ResponseType(typeof(Subcription))]
        public IHttpActionResult DeleteSubcription(int id)
        {
            Subcription subcription = db.Subcription.Find(id);
            if (subcription == null)
            {
                return NotFound();
            }

            db.Subcription.Remove(subcription);
            db.SaveChanges();

            return Ok(subcription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SubcriptionExists(int id)
        {
            return db.Subcription.Count(e => e.Id == id) > 0;
        }
    }
}