
namespace ServiceLocatorPattern
{
    interface ILog
    {
        void Log(string txt);
        void LogFormat(string txt, params object[] p);
    }
}
