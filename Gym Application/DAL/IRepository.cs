using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model;

namespace DAL.Repository
{
    public interface IRepository<TEntity> where TEntity : BaseModel
    {
        void Save(TEntity entity);
        TEntity Delete(TEntity entity);
        void Update(TEntity entity);
        TEntity GetById(int id);
        IEnumerable<TEntity> findAll();
        IQueryable<TEntity> GetQueryable();
    }
}
