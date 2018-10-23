using System;

namespace Bridge_Pattern
{
    class Book : Manuscript
    {
        public Book(IFormatter formatter) : base(formatter)
        {
        }

        public string Title { get; set; }
        public string Author{ get; set; }
        public string Text{ get; set; }

        public override void Print()
        {
            
            Console.WriteLine(Formatter.Format("Title", Title));
            Console.WriteLine(Formatter.Format("Author", Author));
            Console.WriteLine(Formatter.Format("Text", Text));
            Console.WriteLine();
        }
    }

    
}
