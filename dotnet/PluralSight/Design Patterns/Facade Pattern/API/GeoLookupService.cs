using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Facade_Pattern.API
{
    class GeoLookupService
    {
        public Coordinates GetCoordinatesForZipcode(string zipcode)
        {
            return new Coordinates {Latitude = 50, Longitude = 10};
        }

        public string GetCityForZipcode(string zipcode)
        {
            return "Bolern";
        }

        public string GetStateForZipcode(string zipcode)
        {
            return "Idaho";
        }
    }
}
