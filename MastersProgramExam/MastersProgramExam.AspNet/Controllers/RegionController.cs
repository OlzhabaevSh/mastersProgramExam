using MastersProgramExam.AspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MastersProgramExam.AspNet.Controllers
{
    public class RegionController : ApiController
    {
        [HttpGet]
        public ICollection<RegionVM> GetRegions()
        {
            var res = new List<RegionVM>();

            var adapter = new Models.HomebookDatasetTableAdapters.Get_RegionsTableAdapter();

            var data = adapter.GetData();

            for (int i = 0; i < data.Rows.Count; i++)
            {
                res.Add(new RegionVM()
                {
                    Id = data[i].Id,
                    Title = data[i].Title
                });
            }

            return res;
        }
    }
}
