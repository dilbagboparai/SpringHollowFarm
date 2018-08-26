using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpringHollowFarm.Models
{
    public class AppSettings
    {
        public string ConnectionString { get; set; }
        public List<ServiceModel> Services { get; set; }
    }
}
