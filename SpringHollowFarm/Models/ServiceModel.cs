using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpringHollowFarm.Models
{
    public class ServiceModel
    {
        public ServiceModel() => Id = Guid.NewGuid();
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Double Price { get; set; }
        public List<KeyValue> AdditionalFees { get; set; }
        public List<KeyValue> MetaData { get; set; }
    }

    public class KeyValue
    {
        public string Key { get; set; }
        public int Value { get; set; }
    }
}
