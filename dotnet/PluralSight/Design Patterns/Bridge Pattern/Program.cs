using System;
using System.Collections.Generic;

namespace Bridge_Pattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var documents = new List<Manuscript>();
            var formatter = new BackwordsFormatter();

            var faq = new FAQ(formatter) {Title = "The Bridge Pattern FAQ"};
            faq.Questions.Add("What is it", "A design pattern");
            faq.Questions.Add("When do we use it?", "When you need to separate an abstraction from its implementation");
            documents.Add(faq);

            var book = new Book(formatter)
                {
                    Title = "Lots of Patterns",
                    Author = "John Somnez",
                    Text = "Blah, blah"
                };
            documents.Add(book);

            var paper = new TermPaper(formatter)
                {
                    Class = "Design Patterns",
                    Student = "Joe Noob",
                    Text = "Balh blah blah",
                    References = "GOF"
                };
            documents.Add(paper);

            foreach (var doc in documents)
            {
                doc.Print();    
            }
            Console.ReadLine();
        }
    }
}
