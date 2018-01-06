using System.Web;
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
    }
}