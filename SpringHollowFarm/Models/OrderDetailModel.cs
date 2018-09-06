using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpringHollowFarm.Models
{
    public class OrderDetailModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public double TotalAmount { get; set; }
        public List<ServiceModel> Products { get; set; }
    }
}
