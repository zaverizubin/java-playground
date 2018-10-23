using GameOfLife.Models;
using System;
using System.Collections.Generic;

namespace GameOfLife.DAL
{
    public class GameInitializer : System.Data.Entity.DropCreateDatabaseAlways<GameOfLifeEntities>
    {
        protected override void Seed(GameContext context)
        {
            var roles = new List<Role>
            {
                new Role{Name="Admin"},
                new Role{Name="Facilitator"},
                new Role{Name="Scorer"}
            };
            roles.ForEach(s => context.Roles.Add(s));
            context.SaveChanges();

            var users = new List<User>
            {
                new User{Username="Admin",Password="Admin",Enabled=true, Role = roles[0]},
            };

            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();
            
        }
    }
}