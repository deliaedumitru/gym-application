using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model;
using DAL.Repository;
using Business_Layer.DTO;
using Business_Layer.Mappers;

namespace Business_Layer.Services
{
    public class SubscriptionService
    {

        SubscriptionMapper mapper = new SubscriptionMapper();
        public void addSubscription(SubscriptionModelView subscription)
        {
            using (var uow = new UnitOfWork())
            {
                
                uow.Repository<SubscriptionType>().Save(new SubscriptionMapper().SubscriptionMVToSubscription(subscription));
                uow.Save();
            }
        }

        public void purchaseSubscription(SubscriptionUserModelView su)
        {
            using (var uow = new UnitOfWork())
            {
                Subcription subcription = mapper.SubscriptionUserMVToSubscription(su);
                uow.Repository<Subcription>().Save(subcription);
                uow.Save();
            }
        }

        public SubscriptionType deleteSubscription(int id)
        {
            using (var uow = new UnitOfWork())
            {
                SubscriptionType subcription = uow.Repository<SubscriptionType>().GetById(id);

                if (subcription != null)
                {
                    uow.Repository<SubscriptionType>().Delete(subcription);
                    uow.Save();
                    return subcription;
                }
                else
                {
                    throw (new Exception("Subscription not found"));
                }

            }
        }

        public IQueryable<SubscriptionModelView> getAllSubscriptions()
        {

            using (var uow = new UnitOfWork())
            {
                List<SubscriptionModelView> subscriptions = new List<SubscriptionModelView>();
                IEnumerable<SubscriptionType> subs = uow.Repository<SubscriptionType>().findAll();
                foreach (SubscriptionType subscription in subs)
                {
                    subscriptions.Add(new SubscriptionMapper().SubscriptionToSubscriptionMV(subscription));
                }
                return subscriptions.AsQueryable();
            }
        }

        public void updateSubscription(int id,SubscriptionModelView subscription)
        {
            using (var uow = new UnitOfWork())
            {
                if (subscription.Id != id)
                {
                    throw new InvalidOperationException("The IDs of the new object and the old one's are not the same");
                }
                IRepository<SubscriptionType> repo = uow.Repository<SubscriptionType>();
                SubscriptionType old = repo.GetById(id);
             
                if (old == null)
                {
                    throw new InvalidOperationException("The given ID doesn't have an entry in the DB");
                }

               
                old.Name = subscription.Name;
                old.Price = subscription.Price;
                repo.Update(old);
                uow.Save();
            }
        }

        public SubscriptionModelView getByID(int id)
        {
            using (var uow = new UnitOfWork())
            {
                SubscriptionType subcription = uow.Repository<SubscriptionType>().GetById(id);
                if (subcription != null)
                {
                    return new SubscriptionMapper().SubscriptionToSubscriptionMV(subcription);
                }
                else
                {
                    throw (new Exception("Subscription not found"));
                }
            }
        }
    }
}
