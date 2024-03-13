using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateRiskProfileDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        public RiskType RiskType { get; set; }

        public RiskSeverity Severity { get; set; }


        public RiskImpact Impact { get; set; }

        public string Description { get; set; }

        public string RemedialSteps { get; set; }

        public string Status { get; set; }

        public DateTime DateReceived { get; set; }
    }
}
