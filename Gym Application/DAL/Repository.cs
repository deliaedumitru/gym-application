using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DAL.Model;

namespace DAL.Repository
{
    internal class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseModel
    {
        internal GymDBContext context;
        internal DbSet<TEntity> dbSet;

        public Repository(GymDBContext ctx)
        {
            context = ctx;
            dbSet = context.Set<TEntity>();
        }

        public virtual void Save(TEntity entity)
        {
            dbSet.Add(entity);
        }
        public TEntity Delete(TEntity entity)
        {
            TEntity deleted = dbSet.Remove(entity);
            return deleted;
        }
        public void Update(TEntity entity)
        {
            dbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }

        public IEnumerable<TEntity> findAll()
        {
            IQueryable<TEntity> All = dbSet;
            return All.ToList();
        }

        public TEntity GetById(int id)
        {
            TEntity entity = dbSet.Find(id);
            return entity;
        }

        public IQueryable<TEntity> GetQueryable()
        {
            return dbSet;
        }
    }
}
