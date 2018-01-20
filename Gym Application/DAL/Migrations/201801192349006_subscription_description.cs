namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class subscription_description : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SubscriptionType", "Description", c => c.String(maxLength: 100));
            DropColumn("dbo.Subcription", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Subcription", "Description", c => c.String());
            DropColumn("dbo.SubscriptionType", "Description");
        }
    }
}
