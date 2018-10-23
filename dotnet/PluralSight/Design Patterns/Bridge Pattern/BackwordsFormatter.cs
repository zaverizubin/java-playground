using System.Linq;

namespace Bridge_Pattern
{
    class BackwordsFormatter : IFormatter
    {
        public string Format(string key, string value)
        {
            return string.Format("{0} : {1}", key, new string(value.Reverse().ToArray()));
        }
    }
}
