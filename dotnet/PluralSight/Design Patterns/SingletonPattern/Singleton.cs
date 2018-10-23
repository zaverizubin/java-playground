namespace SingletonPattern
{
    class Singleton
    {
        private Singleton _instance;

        private Singleton()
        {
            
        }

        public Singleton Instance
        {
            get
            {
              if (_instance  ==null)
              {
                  _instance = new Singleton();
              }
                return _instance;
            }
        }
    }
}
