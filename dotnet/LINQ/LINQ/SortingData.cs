using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQ
{
    class SortingData
    {
        //Primary Ascending Sort
        void PrimaryAscendingSort()
        {
            string[] words = { "the", "quick", "brown", "fox", "jumps" };

            IEnumerable<string> query = from word in words
                                        orderby word.Substring(0, 1) ascending
                                        select word;
            foreach (var str in query)
            {
                Console.WriteLine(str);
            }
        }

        //Primary Descending Sort
        void PrimaryDescendingSort()
        {
            string[] words = { "the", "quick", "brown", "fox", "jumps" };

            IEnumerable<string> query = from word in words
                                        orderby word.Substring(0, 1) descending
                                        select word;
            foreach (var str in query)
            {
                Console.WriteLine(str);
            }
        }
        
        //Secondary Ascending Sort
        void SecondaryAscendingSort()
        {
            string[] words = { "the", "quick", "brown", "fox", "jumps" };

            IEnumerable<string> query = from word in words
                                        orderby word.Length, word.Substring(0, 1) ascending
                                        select word;
            foreach (var str in query)
            {
                Console.WriteLine(str);
            }
        }

    }
}
