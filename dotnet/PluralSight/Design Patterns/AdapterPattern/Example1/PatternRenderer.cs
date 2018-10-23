using System.Collections.Generic;

namespace AdapterPattern.Example1
{
    public class PatternRenderer
    {
        private readonly PatternRendererAdapter _patternRendererAdapter;

        public PatternRenderer(PatternRendererAdapter patternRendererAdapter)
        {
            _patternRendererAdapter = patternRendererAdapter;
        }

        public string ListPatterns(IEnumerable<Pattern> patterns)
        {
            return _patternRendererAdapter.ListPatterns(patterns);
        }
    }

    

    
}
