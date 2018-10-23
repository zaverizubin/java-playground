using System.ComponentModel.DataAnnotations;

namespace GameOfLife.Models
{
    public class TeamMetadata
    {
        [StringLength(50, MinimumLength = 3), Required]
        public string Name { get; set; }

        public string Description { get; set; }

    }
}