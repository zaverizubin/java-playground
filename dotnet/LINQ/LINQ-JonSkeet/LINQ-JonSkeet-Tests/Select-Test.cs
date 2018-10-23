using LINQ_JonSkeet_Test;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LINQ_JonSkeet;
using MoreLinq;
using JonSkeet.Linq.Tests;

namespace LINQ_JonSkeet_Tests
{
    class Select_Test
    {

        [Test]
        public void SimpleProjectionToDifferentType()
        {
            int[] source = { 1, 5, 2 };
            var result = source.Select(x => x.ToString());
            result.AssertSequenceEqual("1", "5", "2");
        }

        [Test]
        public void SideEffectsInProjection()
        {
            int[] source = new int[3]; // Actual values won’t be relevant 
            int count = 0;
            var query = source.Select(x => count++);
            query.AssertSequenceEqual(0, 1, 2);
            query.AssertSequenceEqual(3, 4, 5);
            count = 10;
            query.AssertSequenceEqual(10, 11, 12);
        }

    }
}
