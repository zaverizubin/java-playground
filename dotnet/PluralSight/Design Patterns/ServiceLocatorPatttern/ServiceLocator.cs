using System.Collections;
using System.Reflection;
using System.Configuration;

namespace ServiceLocatorPattern
{
    internal class ServiceLocator
    {
        private static readonly Hashtable Services = new Hashtable();

        public static void AddService<T>(T t)
        {
            Services.Add(typeof(T).Name, t);
        }

        public static void AddService<T>(string name, T t)
        {
            Services.Add(name, t);
        }

        public static T GetService<T>()
        {
            return (T)Services[typeof(T).Name];
        }


        public static T GetService<T>(string serviceName)
        {
            return (T)Services[serviceName];
        }

        public static void RegisterServiceFromAppSettings(string servicename)
        {
            var loggerEntry = ConfigurationManager.AppSettings[servicename];
            var loggingObject = Assembly.GetExecutingAssembly().CreateInstance(loggerEntry);
            AddService(servicename, loggingObject);
        }

    }
}