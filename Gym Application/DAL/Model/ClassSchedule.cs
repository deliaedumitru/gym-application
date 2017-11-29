namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.Serialization;

    [Table("ClassSchedule")]
    [DataContract]
    public partial class ClassSchedule : BaseModel
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ClassSchedule()
        {
            ClassParticipants = new HashSet<User>();
        }

        [DataMember]
        [DatabaseGenerated( DatabaseGeneratedOption.Identity )]
        public int Id { get; set; }

        [DataMember]
        public int ClassId { get; set; }

        [DataMember]
        public DateTime Date { get; set; }

        [DataMember]
        public int? Capacity { get; set; }

        [DataMember]
        public int? AvailableCapacity { get; set; }

        [DataMember]
        [StringLength(50)]
        public string Room { get; set; }

        [DataMember]
        public int Difficulty { get; set; }

        public virtual Class Class { get; set; }

        public virtual User Trainer { get; set; }

        [DataMember]
        public int TrainerId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> ClassParticipants { get; set; }

    }
}
