namespace MediatorPattern
{
    interface IAirTrafficControl
    {
        void ReceiveAircraftLocation(Aircraft location);
        void RegisterAircraftUnderGuidance(Aircraft aircraft);
    }
}
