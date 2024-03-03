using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateClientFeedbackDto
    {
        [Required]
        [StringLength(128)]
        public Guid ProjectId { get; set; }
        public DateTime FeedbackDate { get; set; }
        public FeedbackType FeedbackType { get; set; }
        public string Details { get; set; }

    }
}