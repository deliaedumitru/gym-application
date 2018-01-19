using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using DAL.Model;

namespace Gym_Application.Authentication
{
    public class Utils
    {
        /// <summary>
        /// Returns the currently authorized user form the context. Null if anonymous.
        /// To be called from within a method wrapped with the [JwtAuthoriztion] filter.
        /// </summary>
        /// <returns></returns>
        public static User GetCurrentUser()
        {
            return HttpContext.Current.Items.Contains("user") ? HttpContext.Current.Items["user"] as User : null;
        }

        /// <summary>
        /// Checks that the current user's role is in the list,
        /// Return wehther th user is in the role list, or 
        /// if the rolelist is empty or null wehter he is authorized
        /// </summary>
        public static bool CheckPermission(List<Role> acceptedRoles=null)
        {
            var currentUser = GetCurrentUser();
            if (acceptedRoles == null || acceptedRoles.Count == 0)
                return (currentUser != null);
            
            if (currentUser == null || !acceptedRoles.Contains(currentUser.Role))
                return false;
            return true;
        }

    }
}