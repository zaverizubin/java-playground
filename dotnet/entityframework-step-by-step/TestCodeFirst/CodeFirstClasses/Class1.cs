using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace CodeFirstClasses
{
    public class Customer
    {
        // Identify the individual customer.
        public Int32 CustomerId { get; set; }
        public String CustomerName { get; set; }
        // Provide linkage to the Purchase class.
        public virtual List<Purchase> Purchases { get; set; }
    }
    public class Purchase
    {
        // Define the individual purchase entries.
        public Int32 PurchaseId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public Decimal Amount { get; set; }
        // Store the customer's identifier for this record.
        public Int32 CustomerId { get; set; }
    }
    // Create a context to the database.
    public class RewardsContext : DbContext
    {
        // Specify the name of the database as Rewards.
        public RewardsContext()
        : base("Rewards")
        {
        }
        // Create a database set for each of the data items.
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
