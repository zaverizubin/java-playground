using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoreLinq;
using NUnit.Framework;

namespace LINQ_JonSkeet
{
    public static class LINQSelect
    {
        public static IEnumerable<TResult> Select<TSource, TResult>(this IEnumerable<TSource> source,
                                                           Func<TSource, TResult> selector)
        {
            if (source == null)
            {
                throw new ArgumentNullException("source");
            }
            if (selector == null)
            {
                throw new ArgumentNullException("selector");
            }
            return SelectImpl(source, selector);
        }

        private static IEnumerable<TResult> SelectImpl<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, TResult> selector)
        {
            foreach (TSource item in source)
            {
                yield return selector(item);
            }
        }

    }
}
