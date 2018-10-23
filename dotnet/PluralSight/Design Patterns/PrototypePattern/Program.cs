using System;

namespace PrototypePattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var webpageScraper = new WebPageScraper("http://www.google.com");
            webpageScraper.PrintPageData();

            var webpageScraper2 = webpageScraper.Clone() as WebPageScraper;
            webpageScraper2.PrintPageData();

            Console.ReadKey();
        }
    }
}
