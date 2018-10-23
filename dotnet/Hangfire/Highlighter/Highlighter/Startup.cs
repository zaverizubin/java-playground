using System;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Highlighter.Startup))]

namespace Highlighter
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configuration.UseSqlServerStorage("HighlighterDb");

            app.UseHangfireDashboard();
            app.UseHangfireServer();
            app.UseHangfireDashboard("/hangfire");
        }
    }
}
