using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateStakeHoldersDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
  
        public string Title { get; set; }

        public string Name { get; set; }
        public string Contact { get; set; }
    }
}
