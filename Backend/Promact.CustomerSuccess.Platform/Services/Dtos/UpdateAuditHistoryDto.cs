
using System.ComponentModel.DataAnnotations;
namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateAuditHistoryDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime DateOfAudit { get; set; }
        public string ReviewedBy { get; set; }
        public string Status { get; set; }
        public string ReviewedSection { get; set; }

        public string CommentOrQueries { get; set; }

        public string ActionItem { get; set; }
    }
}
