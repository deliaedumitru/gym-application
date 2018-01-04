using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business_Layer.DTO;
using DAL.Repository;
using DAL.Model;
using Business_Layer.Mappers;
using System.Security.Cryptography;

namespace Business_Layer.Services
{
    public class UserServices
    {
        //saves the user in db
        public BaseUserModelView CreateAccount(RegistrationModelView model)
        {
            using (var uow = new UnitOfWork())
            {
                User user = UserMapper.RegistrationMVToUser(model);

                Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(model.Password, 32);
                rfc2898DeriveBytes.IterationCount = 10000;
                user.PasswordHash = rfc2898DeriveBytes.GetBytes(20);
                user.PasswordSalt = rfc2898DeriveBytes.Salt;

                uow.Repository<User>().Save(user);
                uow.Save();

                return UserMapper.UserToBaseUserMV(user);
            }
        }

        public BaseUserModelView GetOneAccountWithPassword(LoginModelView model)
        {
            using (var uow = new UnitOfWork())
            {
                string username = model.Username;
                string password = model.Password;

                IEnumerable<User> users = uow.Repository<User>().findAll();
                BaseUserModelView result = null;
                foreach (User user in users)
                {
                    if (user.Username.CompareTo(username) == 0)
                    {
                        Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, user.PasswordSalt);
                        rfc2898DeriveBytes.IterationCount = 10000;
                        byte[] passwordHash = rfc2898DeriveBytes.GetBytes(20);

                        if (passwordHash.SequenceEqual(user.PasswordHash))
                        {
                            result = UserMapper.UserToBaseUserMV(user);
                            break;
                        }
                    }
                }
                if (result == null)
                    throw (new Exception("User not found"));
                return result;
            }
        }

        public List<int> EnrolledClassesIds(int userId)
        {
            using(var uow = new UnitOfWork())
            {
                List<int> ids = new List<int>();
                var user = uow.Repository<User>().GetById(userId);
                foreach(ClassSchedule classSchedule in user.ClassScheduleForParticipant)
                {
                    ids.Add(classSchedule.Id);
                }
                return ids;
            }
        }
    }
}
