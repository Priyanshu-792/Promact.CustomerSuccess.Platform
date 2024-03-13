using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateStakeHoldersDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        public string Title { get; set; }

        public string Name { get; set; }

        public string Contact { get; set; }
    }
}
