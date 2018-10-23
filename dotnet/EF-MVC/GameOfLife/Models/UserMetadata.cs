using System.ComponentModel.DataAnnotations;

namespace GameOfLife.Models
{
    public class UserMetadata
    {
        [StringLength(50, MinimumLength = 3), Required]
        public string Username;

        [Required]
        public bool Enabled;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "You must select a role")]
        public byte Role;
        
    }
}