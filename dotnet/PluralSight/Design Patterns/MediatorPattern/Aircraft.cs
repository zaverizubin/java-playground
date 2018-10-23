using System;

namespace MediatorPattern
{
    abstract class Aircraft
    {
        private readonly IAirTrafficControl _atc;
        private int _currentAltitude;

        protected Aircraft(string callSign, IAirTrafficControl atc)
        {
            _atc = atc;
            CallSign = callSign;
            _atc.RegisterAircraftUnderGuidance(this);
        }

        public abstract int Ceiling { get; }

        public string CallSign { get; private set; }

        public int Altitude { 
            get { return _currentAltitude; } 
            set { 
                _currentAltitude = value;
                _atc.ReceiveAircraftLocation(this);
                }
        }

        public void Climb(int heightToClimb)
        {
            _currentAltitude = _currentAltitude + heightToClimb;
            Console.WriteLine("Aircraft {0} asked to climb by {1}", CallSign, _currentAltitude);
        }

        public virtual void WarnOfAirspaceIntrusionBy(Aircraft reportingAircraft)
        {
            Console.WriteLine("Aircraft {0} airspace intruded by Aircraft {1}",  CallSign, reportingAircraft);
        }

    }
}
