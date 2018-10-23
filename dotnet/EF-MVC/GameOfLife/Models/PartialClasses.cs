using System.ComponentModel.DataAnnotations;

namespace GameOfLife.Models
{
    [MetadataType(typeof(RoomMetadata))]
    public partial class Room
    {
    }

    [MetadataType(typeof(SessionMetadata))]
    public partial class Session
    {
    }

    [MetadataType(typeof(UserMetadata))]
    public partial class User
    {
       
    }

    [MetadataType(typeof(TeamMetadata))]
    public partial class Team
    {
    }
}