using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Dtos
{
    public class UpdateScopeDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string Technology { get; set; }
        public string ScopeDetails { get; set; }
    }
}
