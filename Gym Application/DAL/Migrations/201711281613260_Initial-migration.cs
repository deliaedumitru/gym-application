namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialmigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Class",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ClassSchedule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Capacity = c.Int(),
                        AvailableCapacity = c.Int(),
                        Room = c.String(maxLength: 50),
                        Difficulty = c.Int(nullable: false),
                        TrainerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.TrainerId)
                .ForeignKey("dbo.Class", t => t.ClassId)
                .Index(t => t.ClassId)
                .Index(t => t.TrainerId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false, maxLength: 40),
                        Role = c.Int(nullable: false),
                        Name = c.String(maxLength: 200),
                        PasswordSalt = c.Binary(nullable: false),
                        PasswordHash = c.Binary(nullable: false),
                        Email = c.String(nullable: false, maxLength: 255),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Username, unique: true);
            
            CreateTable(
                "dbo.Feedback",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TrainerId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        Text = c.String(nullable: false, maxLength: 1500),
                        Rating = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.TrainerId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.TrainerId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.PersonalSchedule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParticipantId = c.Int(nullable: false),
                        TrainerId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Room = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ParticipantId)
                .ForeignKey("dbo.Users", t => t.TrainerId)
                .Index(t => t.ParticipantId)
                .Index(t => t.TrainerId);
            
            CreateTable(
                "dbo.Subcription",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        TypeId = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false, storeType: "date"),
                        EndDate = c.DateTime(nullable: false, storeType: "date"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SubscriptionType", t => t.TypeId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.TypeId);
            
            CreateTable(
                "dbo.SubscriptionType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ClassScheduleParticipant",
                c => new
                    {
                        ClassScheduleId = c.Int(nullable: false),
                        ParticipantId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ClassScheduleId, t.ParticipantId })
                .ForeignKey("dbo.ClassSchedule", t => t.ClassScheduleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.ParticipantId, cascadeDelete: true)
                .Index(t => t.ClassScheduleId)
                .Index(t => t.ParticipantId);
            
            CreateTable(
                "dbo.ClassTrainer",
                c => new
                    {
                        ClassId = c.Int(nullable: false),
                        TrainerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ClassId, t.TrainerId })
                .ForeignKey("dbo.Class", t => t.ClassId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.TrainerId, cascadeDelete: true)
                .Index(t => t.ClassId)
                .Index(t => t.TrainerId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ClassTrainer", "TrainerId", "dbo.Users");
            DropForeignKey("dbo.ClassTrainer", "ClassId", "dbo.Class");
            DropForeignKey("dbo.ClassSchedule", "ClassId", "dbo.Class");
            DropForeignKey("dbo.ClassScheduleParticipant", "ParticipantId", "dbo.Users");
            DropForeignKey("dbo.ClassScheduleParticipant", "ClassScheduleId", "dbo.ClassSchedule");
            DropForeignKey("dbo.Subcription", "UserId", "dbo.Users");
            DropForeignKey("dbo.Subcription", "TypeId", "dbo.SubscriptionType");
            DropForeignKey("dbo.PersonalSchedule", "TrainerId", "dbo.Users");
            DropForeignKey("dbo.PersonalSchedule", "ParticipantId", "dbo.Users");
            DropForeignKey("dbo.Feedback", "UserId", "dbo.Users");
            DropForeignKey("dbo.Feedback", "TrainerId", "dbo.Users");
            DropForeignKey("dbo.ClassSchedule", "TrainerId", "dbo.Users");
            DropIndex("dbo.ClassTrainer", new[] { "TrainerId" });
            DropIndex("dbo.ClassTrainer", new[] { "ClassId" });
            DropIndex("dbo.ClassScheduleParticipant", new[] { "ParticipantId" });
            DropIndex("dbo.ClassScheduleParticipant", new[] { "ClassScheduleId" });
            DropIndex("dbo.Subcription", new[] { "TypeId" });
            DropIndex("dbo.Subcription", new[] { "UserId" });
            DropIndex("dbo.PersonalSchedule", new[] { "TrainerId" });
            DropIndex("dbo.PersonalSchedule", new[] { "ParticipantId" });
            DropIndex("dbo.Feedback", new[] { "UserId" });
            DropIndex("dbo.Feedback", new[] { "TrainerId" });
            DropIndex("dbo.Users", new[] { "Username" });
            DropIndex("dbo.ClassSchedule", new[] { "TrainerId" });
            DropIndex("dbo.ClassSchedule", new[] { "ClassId" });
            DropTable("dbo.ClassTrainer");
            DropTable("dbo.ClassScheduleParticipant");
            DropTable("dbo.SubscriptionType");
            DropTable("dbo.Subcription");
            DropTable("dbo.PersonalSchedule");
            DropTable("dbo.Feedback");
            DropTable("dbo.Users");
            DropTable("dbo.ClassSchedule");
            DropTable("dbo.Class");
        }
    }
}
