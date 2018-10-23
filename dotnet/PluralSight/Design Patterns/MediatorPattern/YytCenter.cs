using System;
using System.Collections.Generic;
using System.Linq;

namespace MediatorPattern
{
    class YytCenter:IAirTrafficControl
    {
        private readonly List<Aircraft> _aircraftUnderGuidance = new List<Aircraft>();

        public void ReceiveAircraftLocation(Aircraft reportingAircraft)
        {
            foreach (var currentAircraftUnderGuidance in _aircraftUnderGuidance.Where(x => x != reportingAircraft))
            {
                if (Math.Abs(currentAircraftUnderGuidance.Altitude - reportingAircraft.Altitude) <= 500)
                {
                    reportingAircraft.Climb(1000);
                    currentAircraftUnderGuidance.WarnOfAirspaceIntrusionBy(reportingAircraft);
                } 
            }
        }

        public void RegisterAircraftUnderGuidance(Aircraft aircraft)
        {
            if(!_aircraftUnderGuidance.Contains(aircraft))
            {
                _aircraftUnderGuidance.Add(aircraft);
            }
        }
    }
}
