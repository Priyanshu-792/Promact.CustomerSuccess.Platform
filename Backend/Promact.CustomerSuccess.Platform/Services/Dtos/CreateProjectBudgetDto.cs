using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectBudgetDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        public ProjectType Type { get; set; }

        public int? DurationInMonths { get; set; }

        public int? ContractDuration { get; set; }

        public int? BudgetedHours { get; set; }
        public double BudgetedCost { get; set; }
        public string Currency { get; set; }

        public string Comment { get; set; }
    }
}
