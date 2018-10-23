using System;

namespace ObserverPattern.EventsAndDelegates
{
    class MicrosoftMonitor
    {
        public MicrosoftMonitor(StockTicker st)
        {
            st.StockChange += st_StockChange;
        }

        private void st_StockChange(object sender, StockChangeEventArgs e)
        {
            CheckFilter(e.Stock);
        }

        private void CheckFilter(Stock value)
        {
            if (value.Symbol == "MSFT" && value.Price > 10.00m)
            {
                Console.WriteLine("Microsoft has reached the target price: {0}", value.Price);
            }
        }
    }

    
}
