using Business_Layer.DTO;
using Business_Layer.Mappers;
using DAL.Model;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Services
{
    public class ClassServices
    {
        public BaseClassModelView addClass(ClassModelView classModel)
        {
            using (var uow=new UnitOfWork())
            {
                Class newclass = ClassMapper.ClassMVToClass(classModel);
                newclass.Name = classModel.Name;

                uow.Repository<Class>().Save(newclass);
                uow.Save();

                return ClassMapper.ClassToBaseClassMV(newclass);
            }
        }

        public BaseClassModelView deleteClass( int id )
        {
            using (var uow = new UnitOfWork())
            {
                Class delClass = uow.Repository<Class>().GetById( id );
             
                if (delClass != null)
                {
                    uow.Repository<Class>().Delete(delClass);
                    uow.Save();
                    return ClassMapper.ClassToBaseClassMV(delClass);
                }
                else
                {
                    throw (new Exception("Class not found"));
                }
                
            }
        }

        public IQueryable<BaseClassModelView> getAllClasses()
        {
            using (var uow = new UnitOfWork())
            {
                List<BaseClassModelView> qClasses = new List<BaseClassModelView>();
                IEnumerable<Class> classes = uow.Repository<Class>().findAll();
                foreach (Class c in classes)
                {
                    qClasses.Add(ClassMapper.ClassToBaseClassMV(c));
                }
                return qClasses.AsQueryable();
            }
        }

        public BaseClassModelView getByID( int id )
        {
            using( var uow = new UnitOfWork() )
            {
                Class _class = uow.Repository<Class>().GetById( id );
                if( _class != null )
                {
                    return ClassMapper.ClassToBaseClassMV( _class );
                }
                else
                {
                    throw ( new Exception( "Class not found" ) );
                }
            }
        }
    }
}
