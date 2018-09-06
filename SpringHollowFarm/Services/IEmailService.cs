using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using SpringHollowFarm.Models;

namespace SpringHollowFarm.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string ccEmail, string body, string subject);
        string PopulateBody(string pathToFile, OrderDetailModel model);
    }
}
