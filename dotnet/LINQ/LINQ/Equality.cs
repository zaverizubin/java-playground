using System;
using System.Collections.Generic;
using System.Linq;


namespace LINQ
{
    class Equality
    {
        public class ProductA
        {
            public string Name { get; set; }
            public int Code { get; set; }
        }

        public class ProductComparer : IEqualityComparer<ProductA>
        {

            public bool Equals(ProductA x, ProductA y)
            {
                if (Object.ReferenceEquals(x, y)) return true;

                return x != null && y != null && x.Code.Equals(y.Code) && x.Name.Equals(y.Name);
            }

            public int GetHashCode(ProductA obj)
            {
                int hashProductName = obj.Name == null ? 0 : obj.Name.GetHashCode();
                int hashProductCode = obj.Code.GetHashCode();
                return hashProductName ^ hashProductCode;
            }
        }

        void SequenceEquals()
        {
            ProductA[] storeA = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "orange", Code = 4 } };

            ProductA[] storeB = { new ProductA { Name = "apple", Code = 9 }, 
                       new ProductA { Name = "orange", Code = 4 } };

            bool equalAB = storeA.SequenceEqual(storeB);

            Console.WriteLine("Equal? " + equalAB);

            /*
                This code produces the following output:
    
                Equal? True
            */
        }
    }
}
