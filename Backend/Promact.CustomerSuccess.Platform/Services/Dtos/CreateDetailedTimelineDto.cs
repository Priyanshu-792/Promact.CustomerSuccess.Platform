using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateDetailedTimelineDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        public string Link { get; set; }
    }
}
