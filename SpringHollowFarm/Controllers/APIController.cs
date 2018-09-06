using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SpringHollowFarm.Models;
using SpringHollowFarm.Services;

namespace SpringHollowFarm.Controllers
{
    [Route("api")]
    public class APIController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly IEmailService _emailSettings;
        public APIController(IOptions<AppSettings> appSettings,IEmailService emailService)
        {
            _appSettings = appSettings.Value;
            _emailSettings = emailService;
        }
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
        [Route("getAllServices")]
        public async Task<IActionResult> GetAsync()
        {
            ApiResponse<List<ServiceModel>> response = null;
            try
            {
                var result = _appSettings.Services.ToList();
                response = new ApiResponse<List<ServiceModel>>()
                {
                    Data = result,
                    Error = false,
                    StatusCode = 100
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse<List<ServiceModel>>()
                {
                    Message = ex.Message,
                    Data = null,
                    Error = true,
                    StatusCode = 501
                };
                return Ok(response);
            }

        }

        [Route("paymentCompleted")]
        [HttpPost]
        public async Task<IActionResult> PaymentCompleted([FromBody]OrderDetailModel model)
        {
            ApiResponse<List<ServiceModel>> response = null;
            if(model == null)
                response = new ApiResponse<List<ServiceModel>>()
                {
                    Message = "Model can not be null.",
                    Data = null,
                    Error = true,
                    StatusCode = (int)HttpStatusCode.BadRequest
                };
            if (string.IsNullOrEmpty(model.Email))
                response = new ApiResponse<List<ServiceModel>>()
                {
                    Message = "Email can not be null or empty",
                    Data = null,
                    Error = true,
                    StatusCode = (int)HttpStatusCode.BadRequest
                };
             if (response !=null && response.Error)
               return Ok(response);

            try
            {
                string body = _emailSettings.PopulateBody(@".\EmailTemplates\PaymentConfirmation.html", model);
                await _emailSettings.SendEmailAsync(model.Email, "", body, "Payment Completed");

                //TO DO FOR SEND EMAIL TO ADMIN    ****************************     //
                //List<string> adminToEmail = new List<string>();
                //adminToEmail.Add("admin@admin.com");
                //string adminBody = "This is dummy body.";
                //await EmailService.SendEmailAsync(adminToEmail, null, "Payment Completed", adminBody);

                return Ok(response);
            }
            catch (Exception ex)
            {
                response = new ApiResponse<List<ServiceModel>>()
                {
                    Message = ex.Message,
                    Data = null,
                    Error = true,
                    StatusCode = 501
                };
                return Ok(response);
            }   
           
        }
    }
}
