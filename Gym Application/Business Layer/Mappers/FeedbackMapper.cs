using Business_Layer.DTO;
using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Mappers
{
    public class FeedbackMapper
    {
        public static Feedback FeedbackMVToFeedback(FeedbackModelView model)
        {
            Feedback feedbackM = new Feedback();
            feedbackM.Text = model.Text;
            feedbackM.Rating = model.Rating;
            feedbackM.UserId = model.UserId;
            feedbackM.TrainerId = model.TrainerId;
            return feedbackM;
        }

        public static BaseFeedbackModelView FeedbackToBaseFeedbackMV(Feedback feedbackM)
        {
            BaseFeedbackModelView model = new BaseFeedbackModelView();
            model.Id = feedbackM.Id;
            model.UserId = feedbackM.UserId;
            model.TrainerId = feedbackM.TrainerId;
            model.Rating = feedbackM.Rating;
            model.Text = feedbackM.Text;
            model.Username = feedbackM.User.Username;
            model.NameOfUser = feedbackM.User.Name;
            return model;
        }
    }
}
