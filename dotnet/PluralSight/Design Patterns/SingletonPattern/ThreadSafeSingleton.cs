using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingletonPattern
{
    class ThreadSafeSingleton
    {
        private ThreadSafeSingleton()
        {
            
        }

        public static ThreadSafeSingleton Instance
        {
            get {return Nested.instance}
        }

        private class Nested
        {
            internal static readonly ThreadSafeSingleton instance = new ThreadSafeSingleton();
            static Nested(){}

        }

    }
}
