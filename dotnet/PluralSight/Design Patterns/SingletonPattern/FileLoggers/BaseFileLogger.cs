using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SingletonPattern.FileLoggers
{
    class BaseFileLogger : IFileLogger
    {
        public void WriteLineToFile(string value)
        {
            _logFile.WriteLine(value);
        }

        public void CloseFile()
        {
            _logFile.Close();
        }

        protected TextWriter GetFileStream()
        {
            Thread.Sleep(_delayConfig.DelayMilliseconds);
            return TextWriter.Synchronized(File.AppendText(filePath));
        }
    }
}
