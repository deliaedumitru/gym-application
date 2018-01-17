namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Userfeedbacksubscriptionupdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "AvatarPath", c => c.String());
            AddColumn("dbo.Users", "About", c => c.String());
            AddColumn("dbo.Users", "FacebookHandle", c => c.String());
            AddColumn("dbo.Users", "InstagramHandle", c => c.String());
            AddColumn("dbo.Users", "TwitterHandle", c => c.String());
            AddColumn("dbo.Feedback", "Date", c => c.DateTime(nullable: false, storeType: "date"));
            AddColumn("dbo.Subcription", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Subcription", "Description");
            DropColumn("dbo.Feedback", "Date");
            DropColumn("dbo.Users", "TwitterHandle");
            DropColumn("dbo.Users", "InstagramHandle");
            DropColumn("dbo.Users", "FacebookHandle");
            DropColumn("dbo.Users", "About");
            DropColumn("dbo.Users", "AvatarPath");
        }
    }
}
