using System;
using System.Collections.Generic;

namespace Bridge_Pattern
{
    class FAQ:Manuscript
    {
        public String Title { get; set; }
        public Dictionary<string, string> Questions { get; set; }

        public FAQ(IFormatter formatter)
            : base(formatter)
        {
            Questions = new Dictionary<string, string>();
        }

        
        public override void Print()
        {
            Console.WriteLine(Formatter.Format("Title", Title));
           
            
            foreach (var question in Questions)
            {
                Console.WriteLine(Formatter.Format("     Question", question.Key));
                Console.WriteLine(Formatter.Format("     Answer", question.Value));
            }

            Console.WriteLine();
        }
    }
}
