using System;
using System.ComponentModel.DataAnnotations;

namespace GameOfLife.Models
{
    public class RoomMetadata
    {
        [StringLength(50, MinimumLength = 3), Required]
        public string Name { get; set; }

        [Required]
        public int Facilitator { get; set; }

        [Required]
        public int Scorer { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}