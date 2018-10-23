using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Hangfire;
using Hangfire.Common;
namespace Highlighter
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private BackgroundJobServer _backgroundJobServer;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
}
        protected void Application_BeginRequest()
        {
            StackExchange.Profiling.MiniProfiler.StartNew();
          
        }

        protected void Application_EndRequest()
        {
            if (StackExchange.Profiling.MiniProfiler.Current != null)
            {
                StackExchange.Profiling.MiniProfiler.Current.Stop();
            }
        }
    }
}
