namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.Serialization;

    [Table("Subcription")]
    [DataContract]
    public partial class Subcription : BaseModel
    {
        [DataMember]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public int TypeId { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }

        public virtual SubscriptionType SubscriptionType { get; set; }

        public virtual User User { get; set; }
    }
}
