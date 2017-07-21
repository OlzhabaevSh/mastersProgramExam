using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MastersProgramExam.AspNet.Models
{
    public class PersonVM
    {
        public int Id { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public int RegionId { get; set; }

        public string Title { get; set; }
    }
}