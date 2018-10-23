using System;
using System.Collections.Generic;
using System.Linq;


namespace LINQ
{
    class SetOperations
    {
        
        void Distinct()
        {
            var ages = new List<int> { 21, 46, 46, 55, 17, 21, 55, 55 };

            IEnumerable<int> distinctAges = ages.Distinct();
            Console.WriteLine("Distinct ages:");
            foreach (int age in distinctAges)
            {
                Console.WriteLine(age);
            }     
        }

        void Except()
        {
            double[] numbers1 = { 2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5 };
            double[] numbers2 = { 2.2 };

            IEnumerable<double> onlyInFirstSet = numbers1.Except(numbers2);

            foreach (double number in onlyInFirstSet)
                Console.WriteLine(number);

            ProductA[] store1 = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "orange", Code = 4 } };

            ProductA[] store2 = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "lemon", Code = 12 } };

            IEnumerable<ProductA> duplicates = store1.Except(store2, new ProductComparer());
            foreach (var product in duplicates)
            {
                Console.WriteLine(product.Name + " " + product.Code);
            }
        }
        
        void Intersect()
        {
            int[] id1 = { 44, 26, 92, 30, 71, 38 };
            int[] id2 = { 39, 59, 83, 47, 26, 4, 30 };

            IEnumerable<int> both = id1.Intersect(id2);

            foreach (int id in both)
                Console.WriteLine(id);

            ProductA[] store1 = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "orange", Code = 4 } };

            ProductA[] store2 = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "lemon", Code = 12 } };

            IEnumerable<ProductA> duplicates = store1.Intersect(store2, new ProductComparer());
            foreach (var product in duplicates){
                Console.WriteLine(product.Name + " " + product.Code);
            }
        }

        void Union()
        {
            int[] ints1 = { 5, 3, 9, 7, 5, 9, 3, 7 };
            int[] ints2 = { 8, 3, 6, 4, 4, 9, 1, 0 };

            IEnumerable<int> union = ints1.Union(ints2);

            foreach (int num in union)
            {
                Console.Write("{0} ", num);
            }
        }

        public class ProductA
        {
            public string Name { get; set; }
            public int Code { get; set; }
        }

        public class ProductComparer : IEqualityComparer<ProductA>
        {
            public bool Equals(ProductA x, ProductA y)
            {
                if (ReferenceEquals(x,y)) return true;

                return x != null && y != null && x.Code.Equals(y.Code) && x.Name.Equals(y.Name);
            }

            public int GetHashCode(ProductA obj)
            {
                int hashProductName = obj.Name == null ? 0 : obj.Name.GetHashCode();
                int hashProductCode = obj.Code.GetHashCode();
                return hashProductName ^ hashProductCode;
            }
        }

    }
}
