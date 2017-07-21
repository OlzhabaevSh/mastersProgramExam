using MastersProgramExam.AspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MastersProgramExam.AspNet.Controllers
{
    public class PeopleController : ApiController
    {
        [HttpGet]
        public ICollection<PersonVM> GetPeople(int startId = 0, int pageSize = 5)
        {
            var res = new List<PersonVM>();

            var adapter = new Models.HomebookDatasetTableAdapters.Get_PeopleTableAdapter();

            var data = adapter.GetData(startId, pageSize);
            
            for(int i = 0; i < data.Rows.Count; i++)
            {
                res.Add(new PersonVM()
                {
                    Id = data[i].Id,
                    Firstname = data[i].Firstname,
                    Lastname = data[i].Lastname,
                    RegionId = data[i].Id1,
                    Title = data[i].Title
                });
            }

            return res;
        }

        [HttpPost]
        public void CreatePerson(PersonVM prs)
        {
            var adapter = new Models.HomebookDatasetTableAdapters.QueriesTableAdapter();
            adapter.Insert_Person(prs.Firstname, prs.Lastname, prs.RegionId);
        }

        [HttpPut]
        public void UpdatePerson(PersonVM prs)
        {
            var adapter = new Models.HomebookDatasetTableAdapters.QueriesTableAdapter();

            adapter.Update_Person(prs.Id, prs.Firstname, prs.Lastname, prs.RegionId);
        }

        [HttpDelete]
        public void DeletePerson(int id)
        {
            var adapter = new Models.HomebookDatasetTableAdapters.QueriesTableAdapter();

            adapter.Delete_Person(id);
        }

    }
}
