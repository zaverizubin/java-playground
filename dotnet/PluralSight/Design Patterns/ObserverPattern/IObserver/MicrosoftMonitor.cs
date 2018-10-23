using System;

namespace ObserverPattern.IObserver
{
    class MicrosoftMonitor:IObserver<Stock>
    {
        public void OnNext(Stock value)
        {
            if (value.Symbol == "MSFT" && value.Price > 10.00m)
            {
                Console.WriteLine("Microsoft has reached the target price: {0}", value.Price);
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
