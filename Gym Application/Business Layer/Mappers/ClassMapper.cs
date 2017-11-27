using Business_Layer.DTO;
using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Mappers
{
    public class ClassMapper
    {
        public Class ClassMVToClass(ClassModelView model)
        {
            Class classM = new Class();
            classM.Id = 0;
            classM.Name = model.Name;
            return classM;
        }

        public Class ClassBMVToClass( BaseClassModelView model )
        {
            Class classM = new Class();
            classM.Id = model.Id;
            classM.Name = model.Name;
            return classM;
        }

        public BaseClassModelView ClassToBaseClassMV(Class classM)
        {
            BaseClassModelView model = new BaseClassModelView();
            model.Id = classM.Id;
            model.Name = classM.Name;
            return model;
        }
    }
}
