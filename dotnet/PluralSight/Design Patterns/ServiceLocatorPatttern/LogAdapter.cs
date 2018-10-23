
namespace ServiceLocatorPattern
{
    class LogAdapter :ILog
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof (LogAdapter));

        public void Log(string txt)
        {
            log.Info(txt);
        }

        public void LogFormat(string txt, params object[] p)
        {
            log.InfoFormat(txt, p);
        }
    }
}
