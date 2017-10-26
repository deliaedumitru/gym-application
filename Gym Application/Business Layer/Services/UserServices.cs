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
                User user = new UserMapper().RegistrationMVToUser(model);

                Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(model.Password, 32);
                rfc2898DeriveBytes.IterationCount = 10000;
                user.PasswordHash = rfc2898DeriveBytes.GetBytes(20);
                user.PasswordSalt = rfc2898DeriveBytes.Salt;

                uow.Repository<User>().Save(user);
                uow.Save();

                return new UserMapper().UserToBaseUserMV(user);
            }
        }
    }
}
