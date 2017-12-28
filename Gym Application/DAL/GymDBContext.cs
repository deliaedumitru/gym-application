namespace DAL
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using DAL.Model;

    public partial class GymDBContext : DbContext
    {
        public GymDBContext()
            : base("name=GymDBContext")
        {
        }

        public virtual DbSet<Class> Class { get; set; }
        public virtual DbSet<ClassSchedule> ClassSchedule { get; set; }
        public virtual DbSet<PersonalSchedule> PersonalSchedule { get; set; }
        public virtual DbSet<Feedback> Feedback { get; set; }
        public virtual DbSet<Subcription> Subcription { get; set; }
        public virtual DbSet<SubscriptionType> SubscriptionType { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Class>()
                .HasMany(e => e.ClassSchedule)
                .WithRequired(e => e.Class)
                .HasForeignKey(e => e.ClassId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Class>()
                .HasMany( e => e.ClassTrainers )
                .WithMany( e => e.ClassForTrainer )
                .Map( m => m.ToTable( "ClassTrainer" ).MapLeftKey( "ClassId" ).MapRightKey( "TrainerId" ) );

            modelBuilder.Entity<ClassSchedule>()
                .HasMany(e => e.ClassParticipants)
                .WithMany(e => e.ClassScheduleForParticipant)
                .Map(m => m.ToTable("ClassScheduleParticipant").MapLeftKey("ClassScheduleId").MapRightKey("ParticipantId"));

            modelBuilder.Entity<SubscriptionType>()
                .HasMany(e => e.Subcriptions)
                .WithRequired(e => e.SubscriptionType)
                .HasForeignKey(e => e.TypeId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.GivenFeedback)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.ReceivedFeedback)
                .WithRequired(e => e.Trainer)
                .HasForeignKey(e => e.TrainerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Subcription)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.PersonalScheduleForTrainer)
                .WithRequired(e => e.Trainer)
                .HasForeignKey(e => e.TrainerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.PersonalScheduleForParticipant)
                .WithRequired(e => e.Participant)
                .HasForeignKey(e => e.ParticipantId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany( e => e.ClassScheduleForTrainer )
                .WithRequired( e => e.Trainer )
                .HasForeignKey( e => e.TrainerId )
                .WillCascadeOnDelete( false );

        }
    }
}
