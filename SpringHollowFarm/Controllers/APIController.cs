using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpringHollowFarm.Models;

namespace SpringHollowFarm.Controllers
{
    [Route("api")]
    public class APIController : Controller
    {    
        public ApiResponse<ContactModel> response { get; set; }

        [Route("contactus")]
        public async Task<IActionResult> PostAsync([FromBody]ContactModel contactUsModel)
        {
            try
            {
                
                string contactUsTempate = System.IO.File.ReadAllText(@".\EmailTemplates\ContactUs.txt", Encoding.UTF8);
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                contactUsTempate=contactUsTempate.
                    Replace("%NAME%", $"{contactUsModel.FirstName} {contactUsModel.LastName}").
                    Replace("%EMAIL%", contactUsModel.Email).
                    Replace("%PHONE%", contactUsModel.Phone).
                    Replace("%MESSAGE%", contactUsModel.Message);
                
                mail.From = new MailAddress("springhollowfarm1@gmail.com");
                mail.To.Add("springhollowfarm1@gmail.com");
                mail.Subject = "Contact Us Inquery";
                mail.Body = contactUsTempate;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("springhollowfarm1@gmail.com", "Magnet2018!");
                SmtpServer.EnableSsl = true;

                await SmtpServer.SendMailAsync(mail);

                response = new ApiResponse<ContactModel>()
                {
                    Message = "Email Sent Sucessfully!",
                    Data = contactUsModel,
                    Error = false
                };

            }
            catch (Exception ex)
            {
                response = new ApiResponse<ContactModel>()
                {
                    Message = ex.Message,
                    Data = contactUsModel,
                    Error = true
                };
                return Ok(response);
            }
            return Ok(response);
        }
    }
}
