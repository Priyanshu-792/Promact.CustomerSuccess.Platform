using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateDocumentDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
