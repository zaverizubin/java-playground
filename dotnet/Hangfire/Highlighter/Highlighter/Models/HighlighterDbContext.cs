using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Hangfire.Highlighter.Models
{
    public class HighlighterDbContext : DbContext
    {
        public DbSet<CodeSnippet> CodeSnippets { get; set; }

        public HighlighterDbContext() : base("HighlighterDb")
        {
        }
    }
}