using System;
using System.ComponentModel.DataAnnotations;

namespace GameOfLife.Models
{
    public class SessionMetadata
    {
        [Required]
        public int Room { get; set; }

        public short Duration { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

    }
}