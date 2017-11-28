namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class User : BaseModel
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            GivenFeedback = new HashSet<Feedback>();
            ReceivedFeedback = new HashSet<Feedback>();
            Subcription = new HashSet<Subcription>();
            PersonalScheduleForTrainer = new HashSet<PersonalSchedule>();
            PersonalScheduleForParticipant = new HashSet<PersonalSchedule>();
            ClassForTrainer = new HashSet<Class>();
            ClassScheduleForParticipant = new HashSet<ClassSchedule>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        [Index(IsUnique = true)]
        public string Username { get; set; }

        public Role Role { get; set; }

        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [InverseProperty("User")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Feedback> GivenFeedback { get; set; }

        [InverseProperty("Trainer")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Feedback> ReceivedFeedback { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Subcription> Subcription { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Class> ClassForTrainer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClassSchedule> ClassScheduleForTrainer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClassSchedule> ClassScheduleForParticipant { get; set; }

        [InverseProperty("Trainer")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonalSchedule> PersonalScheduleForTrainer { get; set; }

        [InverseProperty("Participant")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonalSchedule> PersonalScheduleForParticipant { get; set; }
    }
}
