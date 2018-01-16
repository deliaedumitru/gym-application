namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class email_notifications : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WaitingQueue",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassScheduleId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.ClassSchedule", t => t.ClassScheduleId, cascadeDelete: true)
                .Index(t => t.ClassScheduleId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.WaitingQueue", "ClassScheduleId", "dbo.ClassSchedule");
            DropForeignKey("dbo.WaitingQueue", "UserId", "dbo.Users");
            DropIndex("dbo.WaitingQueue", new[] { "UserId" });
            DropIndex("dbo.WaitingQueue", new[] { "ClassScheduleId" });
            DropTable("dbo.WaitingQueue");
        }
    }
}
