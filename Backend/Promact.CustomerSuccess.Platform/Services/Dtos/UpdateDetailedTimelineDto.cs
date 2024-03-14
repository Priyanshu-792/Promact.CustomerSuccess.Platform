
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateDetailedTimelineDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }

        public string Link { get; set; }
    }
}
