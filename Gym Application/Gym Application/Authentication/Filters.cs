using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Business_Layer.Services;
using DAL.Model;


namespace Gym_Application.Authentication
{
    /// <summary>
    /// Filter to put on controller method that inserts the current user into the context
    /// The user is taken from an authorization JWT token passed via the Authroization header
    /// 
    /// To use: put [JwtAuthentication] on the method
    /// </summary>
    public class JwtAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        public string Realm { get; set; }
        public bool AllowMultiple
        {
            get
            {
                return false;
            }
        }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            // set the context to null initially  if it passs athentication replace it with the user
            HttpContext.Current.Items["user"] = null;

            if (authorization == null || authorization.Scheme != "Bearer")
                return;

            if (string.IsNullOrEmpty(authorization.Parameter))
                return; // no jwt token basically indicates that there is no user

            var token = authorization.Parameter;

            HttpContext.Current.Items["user"] = ValidateToken(token);
        }

        /// <summary>
        /// Reutnrs the user from the token, or null if unspecified
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        private static User ValidateToken(string token)
        {
            var simplePrinciple = JwtManager.GetPrincipal(token);

            if( ( simplePrinciple == null ) || ( simplePrinciple.Identity == null ) )
                return null; // no token or expired

            var identity = simplePrinciple.Identity as ClaimsIdentity;
            if (!identity.IsAuthenticated)
                return null; // not a user

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            var username = usernameClaim == null ? null : usernameClaim.Value;

            if (string.IsNullOrEmpty(username))
                return null; // username is null

            return UserServices.GetAccountByUsername(username);
                // return the corresponding user, or null if not in database
        }


        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            // boilerplate
            return Task.FromResult(0);
        }
    }
}