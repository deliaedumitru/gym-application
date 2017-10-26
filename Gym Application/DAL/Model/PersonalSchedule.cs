namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PersonalSchedule")]
    public partial class PersonalSchedule : BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ParticipantId { get; set; }

        public int TrainerId { get; set; }

        public DateTime Date { get; set; }

        [StringLength(50)]
        public string Room { get; set; }

        [InverseProperty("PersonalScheduleForParticipant")]
        public virtual User Participant { get; set; }

        [InverseProperty("PersonalScheduleForTrainer")]
        public virtual User Trainer { get; set; }
    }
}
