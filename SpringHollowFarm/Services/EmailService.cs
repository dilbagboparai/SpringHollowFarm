using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using SpringHollowFarm.Models;

namespace SpringHollowFarm.Services
{
    public class EmailService : IEmailService
    {
        public readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _environment;
        public EmailService(IOptions<EmailSettings> emailOptions, IHostingEnvironment env)
        {
            _emailSettings = emailOptions.Value;
            _environment = env;
        }
        public async Task SendEmailAsync(string toEmail,string ccEmail,string body,string subject)
        {
            string _toEmail = string.IsNullOrEmpty(toEmail)
                ? _emailSettings.ToAdminEmail
                : toEmail;

            string _ccEmail = string.IsNullOrEmpty(ccEmail)
                ? _emailSettings.ToAdminEmail
                : ccEmail;

            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient(_emailSettings.PrimaryDomain);
            mail.From = new MailAddress(_emailSettings.FromEmail);
            mail.To.Add(_toEmail);
            if(!string.IsNullOrEmpty(_ccEmail))
             mail.CC.Add(_ccEmail);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword);
            SmtpServer.EnableSsl = true;
            await SmtpServer.SendMailAsync(mail);
        }
        public string PopulateBody(string pathToFile, OrderDetailModel model)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(pathToFile))
            {
                body = reader.ReadToEnd();
            }

            string baseURL = "http://www.springhollowfarm.us";

            StringBuilder productsHtml = new StringBuilder();
            model.Products.ForEach((x) =>
            {
                productsHtml.AppendLine(
                    $@"<tr style='text - align:left; border - bottom:1px #ccc solid;'><td style='width: 20px;'>1x</td>
                    <td> <img src = '{baseURL}/assets/images/{x.Image}' alt = '' style = 'max-width: 120px;'></td><td>{x.Name}</td><td>${GetTotal(x)} </td> </tr> ");
            });
            body = body.Replace("{Products}", productsHtml.ToString());
            body = body.Replace("{TotalAmount}", model.TotalAmount.ToString());
            body = body.Replace("{Logo}",$"{baseURL}/assets/images/logo.png");
            return body;
        }

        private double GetTotal(ServiceModel model)
        {
            double total = model.Price;
            foreach (var item in model.AdditionalFees)
            {
                total += item.Value;
            }

            return total;
        }
    }
}
