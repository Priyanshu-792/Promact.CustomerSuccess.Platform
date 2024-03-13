using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Dtos
{
    public class CreateScopeDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        public string Technology { get; set; }
        public string ScopeDetails { get; set; }
    }
}
