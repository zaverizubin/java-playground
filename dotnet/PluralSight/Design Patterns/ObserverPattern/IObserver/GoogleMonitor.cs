using System;

namespace ObserverPattern.IObserver
{
    class GoogleMonitor:IObserver<Stock>
    {
       
        public void OnNext(Stock value)
        {
            if (value.Symbol == "GOOG" && value.Price > 5.00m)
            {
                Console.WriteLine("Google has reached the target price: {0}", value.Price);
            }
        }

        public void OnError(Exception error)
        {
            Console.WriteLine("Error occured on stock ticker.");
        }

        public void OnCompleted()
        {
            Console.WriteLine("End of trading day.");
        }
    }
}
