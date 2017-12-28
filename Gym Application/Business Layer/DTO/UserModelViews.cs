using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Business_Layer.DTO
{
    public class RegistrationModelView
    {
        [Required]
        [StringLength(40)]
        public string Username { get; set; }
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        public int Role { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class BaseUserModelView
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public int Role { get; set; }
    }

    public class LoginModelView
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
