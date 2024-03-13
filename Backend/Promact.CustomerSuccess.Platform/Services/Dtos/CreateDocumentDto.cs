
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateDocumentDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
