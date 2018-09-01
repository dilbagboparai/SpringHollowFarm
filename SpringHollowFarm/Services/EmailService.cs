using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SpringHollowFarm.Services
{
    public static class EmailService
    {
        public static async Task SendEmailAsync(List<string> toEamil,List<string> ccEmail,string body,string subject)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("springhollowfarm1@gmail.com");
            toEamil.ForEach(x => mail.To.Add(x));
            ccEmail.ForEach(x => mail.CC.Add(x));
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("springhollowfarm1@gmail.com", "Magnet2018!");
            SmtpServer.EnableSsl = true;
            await SmtpServer.SendMailAsync(mail);
        }
    }
}
