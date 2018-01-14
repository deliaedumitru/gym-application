using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

using DAL.Model;
using DAL.Repository;

namespace Business_Layer.Services
{
    public class WaitingQueueService
    {
    
        public void addToQueue(int classScheduleID, int userID)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                IRepository<WaitingQueue> wqRepo = uow.Repository<WaitingQueue>();
                IRepository<User> userRepo = uow.Repository<User>();
                IRepository<ClassSchedule> csRepo = uow.Repository<ClassSchedule>();

                ClassSchedule cs = csRepo.GetById(classScheduleID);
                User us = userRepo.GetById(userID);

                if(cs == null || us == null)
                {
                    return;
                }

                WaitingQueue wq = new WaitingQueue
                {
                    ClassSchedule = cs,
                    User = us,
                    ClassScheduleId = classScheduleID,
                    UserId = userID
                };

                wqRepo.Save(wq);
                uow.Save();
            }
        }

        public void clearAndNotify(int classScheduleID)
       {
            string inEmail = "veveritele.gryffindor@gmail.com";
            string password = "xfD6qy760izkQtd0";
            NetworkCredential netCred = new NetworkCredential(inEmail, password);

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = netCred;

            using (UnitOfWork uow = new UnitOfWork())
            {
                IRepository<ClassSchedule> csRepo = uow.Repository<ClassSchedule>();
                IRepository<WaitingQueue> wqRepo = uow.Repository<WaitingQueue>();

                ClassSchedule csC = csRepo.GetById(classScheduleID);

                if (csC == null)
                    return;

                List<WaitingQueue> wqList = new List<WaitingQueue>(csC.UsersOnHold);
                for (int i = 0; i < wqList.Count; ++i)
                {
                    WaitingQueue wqU = wqList[i];


                    wqU.User = uow.Repository<User>().GetById(wqU.UserId);
                    if (wqU.User != null)
                    {
                        // send mail
                        MailMessage msg = new MailMessage(inEmail, wqU.User.Email, "EMAIL!", "YOU'VE GOT MAIL!\n\n...\n\nWHY AM I SCREAMING?");
                        smtpClient.Send(msg);
                    }
                    // delete from queue
                    wqRepo.Delete(wqU);
                }

                // save changes
                uow.Save();
            }
        }

    }
}
