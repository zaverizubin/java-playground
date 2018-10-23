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
    class Where_Test
    {

        [Test]
        public void SimpleFiltering()
        {
            int[] source = { 1, 3, 4, 2, 8, 1 };
            var result = source.Where(x => x < 4);
            result.AssertSequenceEqual(new int[] { 1, 3, 2, 1 });
        }

        [Test]
        public void NullSourceThrowsNullArgumentException()
        {
            IEnumerable<int> source = null;
            Assert.Throws<ArgumentNullException>(() => source.Where(x => x > 5));
        }

        [Test]
        public void NullPredicateThrowsNullArgumentException()
        {
            int[] source = { 1, 3, 7, 9, 10 };
            Func<int, bool> predicate = null;
            Assert.Throws<ArgumentNullException>(() => source.Where(predicate));
        }

        [Test]
        public void ExecutionIsDeferred()
        {
            ThrowingEnumerable.AssertDeferred(src => src.Where(x => x > 0));
        }
    }
}
