using System;
using Facade_Pattern.API;

namespace Facade_Pattern
{
    class Program
    {
        static void Main()
        {
            const string zipcode = "93174";

            var temperaturelLookup = new TemperaturelLookupFacade(new WeatherService(), new GeoLookupService(), new EnglishMetricConverter());
            LocalTemperature localTemp = temperaturelLookup.GetTemperature(zipcode);
           
            Console.WriteLine("The temperature is {0}F/{1}C in {2} {3}", localTemp.Farenheit, localTemp.Celcius,localTemp.City,localTemp.State);

            Console.ReadKey();

        }
    }

    

   
}
