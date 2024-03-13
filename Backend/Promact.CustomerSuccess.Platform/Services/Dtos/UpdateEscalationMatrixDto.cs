﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateEscalationMatrixDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid ProjectId { get; set; }

        public EscalationMatrixLevels Level { get; set; }

        public EscalationType EscalationType { get; set; }
        public string Name { get; set; }

        public string Role { get; set; }
    }
}
