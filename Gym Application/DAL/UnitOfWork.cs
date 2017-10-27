using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model;

namespace DAL.Repository
{
    public class UnitOfWork : IDisposable
    {
        private GymDBContext context;
        private Dictionary<Type, object> repositories;

        public UnitOfWork()
        {
            context = new GymDBContext();
            repositories = new Dictionary<Type, object>();
        }

        public IRepository<T> Repository<T>() where T : BaseModel
        {
            var typeKey = typeof(T);
            if (!repositories.ContainsKey(typeKey))
                repositories.Add(typeKey, new Repository<T>(context));
            return repositories[typeof(T)] as IRepository<T>;
        }

        public void Dispose()
        {
            context.Dispose();
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
