using System;
using System.Collections.Generic;

namespace ObserverPattern.IObserver
{
    class StockTicker :IObservable<Stock>
    {
        readonly List<IObserver<Stock>> _observers = new List<IObserver<Stock>>();

        private Stock _stock;
        public Stock Stock
        {
            get { return _stock; }
            set { _stock = value;
                Notify(_stock);
            }
        }

        private void Notify(Stock s)
        {
            foreach (var o in _observers)
            {
               if(s.Symbol==null || s.Price<0)
               {
                   o.OnError(new Exception("Bad Stock Data"));
               }else
               {
                   o.OnNext(s);
               }
            }
        }

        private void Stop()
        {
            foreach (var observer in _observers.ToArray())
            {
                if (_observers.Contains(observer))
                {
                    observer.OnCompleted();
                }
            }
            _observers.Clear();
        }

        public IDisposable Subscribe(IObserver<Stock> observer)
        {
           if(!_observers.Contains(observer))
           {
               _observers.Add(observer);
           }
           return new Unsubscriber(_observers, observer);
        }


    }

    
}
