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
        public static Class ClassMVToClass( ClassModelView model )
        {
            Class classM = new Class();
            classM.Name = model.Name;
            return classM;
        }

        public static BaseClassModelView ClassToBaseClassMV( Class classM )
        {
            BaseClassModelView model = new BaseClassModelView();
            model.Id = classM.Id;
            model.Name = classM.Name;
            return model;
        }
    }
}
