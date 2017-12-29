using Business_Layer.DTO;
using Business_Layer.Mappers;
using DAL.Model;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Services
{
    public class FeedbackServices
    {
        public BaseFeedbackModelView giveFeedback(FeedbackModelView feedbackModel)
        {
            using (var uow = new UnitOfWork())
            {
                Feedback newFeedback = new FeedbackMapper().FeedbackMVToFeedback(feedbackModel);
                newFeedback.Text = feedbackModel.Text;
                newFeedback.TrainerId = feedbackModel.TrainerId;
                newFeedback.UserId = feedbackModel.UserId;
                newFeedback.Rating = feedbackModel.Rating;

                uow.Repository<Feedback>().Save(newFeedback);
                uow.Save();

                return new FeedbackMapper().FeedbackToBaseFeedbackMV(newFeedback);
            }
        }

        public IQueryable<BaseFeedbackModelView> getFeedbacksForTrainer(int TrainerId)
        {
            using (var uow = new UnitOfWork())
            {
                List<BaseFeedbackModelView> qFeedbacks = new List<BaseFeedbackModelView>();
                IEnumerable<Feedback> feedbacks = uow.Repository<Feedback>().findAll();
                foreach (Feedback f in feedbacks)
                {
                    if (f.TrainerId == TrainerId)
                    {
                        qFeedbacks.Add(new FeedbackMapper().FeedbackToBaseFeedbackMV(f));
                    }
                }
                return qFeedbacks.AsQueryable();
            }
        }
    }
}
