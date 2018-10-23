using System;

namespace ObserverPattern.EventsAndDelegates
{
    class GoogleMonitor
    {
        public GoogleMonitor(StockTicker st)
        {
            st.StockChange += st_StockChange;
          }

        private void st_StockChange(object sender, StockChangeEventArgs e)
        {
            CheckFilter(e.Stock);
        }

        private void CheckFilter(Stock value)
        {
            if (value.Symbol == "GOOG" && value.Price > 5.00m)
            {
                Console.WriteLine("Google has reached the target price: {0}", value.Price);
            }
        }
    }
}
