using System;

namespace ObserverPattern.EventsAndDelegates
{
    class StockTicker:IObservable<Stock>
    {
        private Stock _stock;
        public Stock Stock
        {
            get { return _stock; }
            set
            {
                _stock =value;
                OnStockChange(new StockChangeEventArgs(_stock));
            }
        }

        public event EventHandler<StockChangeEventArgs> StockChange;

        protected virtual void OnStockChange(StockChangeEventArgs e)
        {
            if (StockChange != null)
            {
                StockChange(this, e);
            }
        }

        public IDisposable Subscribe(IObserver<Stock> observer)
        {
            throw new NotImplementedException();
        }
    }

    internal class StockChangeEventArgs
    {
        private Stock _stock;
        public StockChangeEventArgs(Stock stock)
        {
            _stock = stock;
        }

        public Stock Stock
        {
            get { return _stock; }
        }

    }
}
