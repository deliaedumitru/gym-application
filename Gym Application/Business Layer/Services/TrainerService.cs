﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DAL.Repository;
using DAL.Model;

namespace Business_Layer.Services
{
    public class TrainerService
    {

        public IEnumerable<User> GetTrainers()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.Repository<User>()
                    .findAll()
                    .Where(e => e.Role == Role.TRAINER);
            }
        }

        public bool AddTrainer(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                IRepository<User> user_repo = uow.Repository<User>();
                User found_user = user_repo.GetById(id);
                bool found = found_user != null,
                    is_normal_user = found && found_user.Role == Role.USER;

                // If we found the user, mark him as a trainer
                // Do this only if it is a normal user. We do not want people demoting admins
                if (is_normal_user)
                {
                    found_user.Role = Role.TRAINER;
                    user_repo.Update(found_user);
                    uow.Save();
                    return true;
                }
            }
            return false;
        }

        public bool DeleteTrainer(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                IRepository<User> user_repo = uow.Repository<User>();
                User found_user = user_repo.GetById(id);
                bool found = found_user != null,
                    is_trainer = found && found_user.Role == Role.TRAINER;

                // If we found the user, mark him as a normal user
                // Do this only if it is a trainer. We do not want people demoting admins
                if (is_trainer)
                {
                    found_user.Role = Role.USER;
                    user_repo.Update(found_user);
                    uow.Save();
                    return true;
                }
            }
            return false;
        }

        public User GetTrainer(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                IRepository<User> user_repo = uow.Repository<User>();
                User user = user_repo.GetById(id);
                if (user != null && user.Role == Role.TRAINER)
                {
                    user.ClassForTrainer = user.ClassForTrainer;
                    return user;
                }
            }

            return null;
        }

    }
}
