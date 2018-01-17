namespace DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Feedback")]
    public partial class Feedback : BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int TrainerId { get; set; }
        
        public int UserId { get; set; }

        [Required]
        [StringLength(1500)]
        public string Text { get; set; }

        public short Rating { get; set; }
        
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }

        [InverseProperty("ReceivedFeedback")]
        public virtual User Trainer { get; set; }

        [InverseProperty("GivenFeedback")]
        public virtual User User { get; set; }
    }
}
