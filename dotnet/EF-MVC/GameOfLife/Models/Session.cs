//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GameOfLife.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Session
    {
        public int Id { get; set; }
        public string SessionKey { get; set; }
        public int Room { get; set; }
        public bool Completed { get; set; }
        public short Duration { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string SessionData { get; set; }
        public System.DateTime CreatedOn { get; set; }
    
        public virtual Room Room1 { get; set; }
    }
}
