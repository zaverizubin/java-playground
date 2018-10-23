using System;
using System.Net;

namespace PrototypePattern
{
    class WebPageScraper:ICloneable
    {
        private string _title;
        private int _headerTagCount;
        private string _firstHeaderTagContents;

        public WebPageScraper(string url)
        {
            var client = new WebClient();
            Scrape(client.DownloadString(url));
        }

        private void Scrape(string page)
        {
            _title = "Fake title";
            _headerTagCount = 3;
            _firstHeaderTagContents = "Fake Header Text";
        }

        public void PrintPageData()
        {
            Console.WriteLine("Title: {0}, Header Count: {1}, First header {2}", _title, _headerTagCount, _firstHeaderTagContents);

        }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}
