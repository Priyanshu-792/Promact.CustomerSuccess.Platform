﻿using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateClientFeedbackDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        public FeedbackType FeedbackType { get; set; }
        public DateTime DateReceived { get; set; }
        public string DetailedFeedback { get; set; }
        public string ActionTaken { get; set; }
        public DateTime ClosureDate { get; set; }

    }
}