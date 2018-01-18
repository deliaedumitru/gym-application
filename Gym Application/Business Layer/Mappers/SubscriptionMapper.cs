using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DAL.Model;
using Business_Layer.DTO;

namespace Business_Layer.Mappers
{
    public class SubscriptionMapper
    {
           public SubscriptionType SubscriptionMVToSubscription(SubscriptionModelView subscriptionModelView)
            {
                SubscriptionType subscription = new SubscriptionType();
                subscription.Id = subscriptionModelView.Id;
                subscription.Name = subscriptionModelView.Name;
                subscription.Price = subscriptionModelView.Price;
              
                return subscription;
            }

        public SubscriptionModelView SubscriptionToSubscriptionMV(SubscriptionType subscription)
        {
            SubscriptionModelView subscriptionMV = new SubscriptionModelView();
            subscriptionMV.Id = subscription.Id;
            subscriptionMV.Name = subscription.Name;
            subscriptionMV.Price = subscription.Price;
          
            return subscriptionMV;
        }

        public Subcription SubscriptionUserMVToSubscription(SubscriptionUserModelView su)
        {
            Subcription subcription = new Subcription();
            subcription.TypeId = su.TypeId;
            subcription.UserId = su.UserId;
            subcription.StartDate = su.StartDate;
            subcription.EndDate = su.EndDate;
            return subcription;
        }
    }
}
