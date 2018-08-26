using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpringHollowFarm.Models
{
    public class ApiResponse<T> where T : class
    {        
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public bool Error { get; set; }
        public T Data { get; set; }
    }
}
