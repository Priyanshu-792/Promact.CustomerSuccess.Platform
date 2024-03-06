using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateMeetingMinuteDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime MeetingDate { get; set; }
        public int Duration { get; set; }
        public string MoMLink { get; set; }
        public string Comments { get; set; }
    }
}