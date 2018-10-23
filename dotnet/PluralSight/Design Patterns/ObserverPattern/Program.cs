using System;
using ObserverPattern.EventsAndDelegates;
using ObserverPattern.IObserver;

namespace ObserverPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            /*Events and Delegates pattern
             
             var sampleData = new[]{new EventsAndDelegates.Stock(){Price = 2m, Symbol= "GOOG"},new EventsAndDelegates.Stock(){Price = 4m, Symbol= "MSFT"},
                new EventsAndDelegates.Stock(){Price = 6m, Symbol= "GOOG"},new EventsAndDelegates.Stock(){Price = 12m, Symbol= "MSFT"},
                new EventsAndDelegates.Stock(){Price = 10m, Symbol= "GOOG"}};
             
            var st = new StockTicker();
            var gf = new GoogleMonitor(st);
            var mf = new MicrosoftMonitor(st);

            foreach (var s in sampleData)
            {
                st.Stock = s;
            }
            Console.ReadKey();*/

            /*IObserver Pattern*/
            var sampleData = new[]{new IObserver.Stock(){Price = 2m, Symbol= "GOOG"},new IObserver.Stock(){Price = 4m, Symbol= "MSFT"},
                new IObserver.Stock(){Price = 6m, Symbol= "GOOG"},new IObserver.Stock(){Price = 12m, Symbol= "MSFT"},
                new IObserver.Stock(){Price = 10m, Symbol= "GOOG"}};

            var stockTicker = new IObserver.StockTicker();
            var googleMonitor = new IObserver.GoogleMonitor();
            var microsoftMonitor = new IObserver.MicrosoftMonitor();

            using (stockTicker.Subscribe(microsoftMonitor))
            using (stockTicker.Subscribe(googleMonitor))
            {
                foreach (var s in sampleData)
                {
                    stockTicker.Stock = s;
                }
            }
            Console.ReadKey();
        }
    }
}
