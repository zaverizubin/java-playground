using System;

namespace ServiceLocatorPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceLocator.RegisterServiceFromAppSettings("logger");
            var log = ServiceLocator.GetService<ILog>("logger");
            log.Log("Hi there");
            Console.WriteLine("Logging Completed. Please review file actions.log");
            Console.ReadKey();
        }


    }
}
