using System.IO;


namespace ServiceLocatorPattern
{
    class LoggingClass:ILog
    {

        private StreamWriter _logFile;

        public void Log(string txt)
        {
            InternalLog(txt);
        }

        public void LogFormat(string txt, params object[] p)
        {
            string msg = string.Format(txt, p);
            InternalLog(msg);
        }

        private void InternalLog(string txt)
        {
            if (_logFile == null)
            {
                _logFile = new StreamWriter("actions.log");
            }
            _logFile.WriteLine(txt);
            _logFile.Flush();
        }
    }
}
