using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gym_Application.Models
{
    public class DateSpan
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateSpan(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}