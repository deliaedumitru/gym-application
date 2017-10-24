namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ClassSchedule")]
    public partial class ClassSchedule
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ClassSchedule()
        {
            ClassParticipants = new HashSet<User>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ClassId { get; set; }

        public DateTime Date { get; set; }

        public int? Capacity { get; set; }

        [StringLength(50)]
        public string Room { get; set; }

        public int Difficulty { get; set; }

        public virtual Class Class { get; set; }

        public virtual User Trainer { get; set; }

        public int TrainerId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> ClassParticipants { get; set; }

    }
}
