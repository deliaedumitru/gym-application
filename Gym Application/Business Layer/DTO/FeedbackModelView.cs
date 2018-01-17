using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.DTO
{
    public class FeedbackModelView
    {
        public int TrainerId { get; set; }

        public int UserId { get; set; }

        public string Text { get; set; }

        public short Rating { get; set; }
    }

    public class BaseFeedbackModelView
    {
        public int Id { get; set; }
        public int TrainerId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string NameOfUser { get; set; }
        public string Text { get; set; }
        public short Rating { get; set; }
        public DateTime date { get; set; }
    }
}
