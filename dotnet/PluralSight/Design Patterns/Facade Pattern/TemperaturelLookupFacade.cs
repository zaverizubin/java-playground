using Facade_Pattern.API;

namespace Facade_Pattern
{
    internal class TemperaturelLookupFacade
    {
        readonly WeatherService _weatherService;
        readonly GeoLookupService _geoLookupService;
        readonly EnglishMetricConverter _englishMetricConverter;


        public TemperaturelLookupFacade(WeatherService weatherService, GeoLookupService geoLookupService, EnglishMetricConverter englishMetricConverter)
        {
            _weatherService = weatherService;
            _geoLookupService = geoLookupService;
            _englishMetricConverter = englishMetricConverter;
        }

        public LocalTemperature GetTemperature(string zipcode)
        {
            var coords = _geoLookupService.GetCoordinatesForZipcode(zipcode);
            var city =  _geoLookupService.GetCityForZipcode(zipcode);
            var state =  _geoLookupService.GetStateForZipcode(zipcode);
            var farenheit = _weatherService.GetTemperatureFarenheit(coords.Latitude, coords.Longitude);
            var celcius = _englishMetricConverter.FarenheitToCelcius(farenheit);

            return new LocalTemperature
                {
                    Farenheit = farenheit,
                    Celcius = celcius,
                    City = city,
                    State = state
                };
        }
    }

    
}
