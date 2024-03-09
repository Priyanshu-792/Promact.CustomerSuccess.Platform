using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectDescriptionDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        public string Description { get; set; }
    }
}
