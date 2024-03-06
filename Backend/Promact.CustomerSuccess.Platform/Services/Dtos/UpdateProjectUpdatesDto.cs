﻿using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateProjectUpdatesDto
    {
        [Required]
    
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime Date { get; set; }
        public string GeneralUpdates { get; set; }

    }
}