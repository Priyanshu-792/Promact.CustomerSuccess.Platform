using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;


namespace Promact.CustomerSuccess.Platform.Entities
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private const string EmailHost = "smtp.gmail.com";
        private const int EmailPort = 587;
        private const string EmailUsername = "priyanshusharma72002@gmail.com";
        private const string EmailPassword = "dcovmvshssnpwmjo";

        [HttpPost("send")]
        public IActionResult SendEmails([FromBody] List<EmailDto> emails)
        {
            if (emails == null || emails.Count == 0)
            {
                return BadRequest("At least one email should be provided");
            }

            foreach (var email in emails)
            {
                // Send email to each recipient
                SendEmail(email);
            }

            return Ok();
        }

        private void SendEmail(EmailDto email)
        {
            foreach (var recipient in email.Recipients)
            {
                var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(MailboxAddress.Parse(EmailUsername));
                mimeMessage.To.Add(MailboxAddress.Parse(recipient));
                mimeMessage.Subject = email.Subject;
                mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = email.Body
                };

                using var smtpClient = new SmtpClient();
                smtpClient.Connect(EmailHost, EmailPort, MailKit.Security.SecureSocketOptions.StartTls);
                smtpClient.Authenticate(EmailUsername, EmailPassword);
                smtpClient.Send(mimeMessage);
                smtpClient.Disconnect(true);
            }
        }
    }

    public class EmailDto
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<string> Recipients { get; set; }
    }
}



