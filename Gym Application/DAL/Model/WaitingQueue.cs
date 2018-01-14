using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("WaitingQueue")]
    public partial class WaitingQueue : BaseModel
    {
        public WaitingQueue()
        {

        }
    
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public ClassSchedule ClassSchedule { get; set; }

        public int ClassScheduleId { get; set; }

        [Required]
        public User User { get; set; }

        public int UserId { get; set; }
    }
}
