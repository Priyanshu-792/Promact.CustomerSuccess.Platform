using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateEscalationMatrixDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public EscalationMatrixLevels Level { get; set; }

        [Required]
        public EscalationType EscalationType { get; set; }
        public string Name { get; set; }
        public string ChangeReason { get; set; }
    }
}
