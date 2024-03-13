using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;
namespace Promact.CustomerSuccess.Platform.Entities
{
    public class VersionHistory : Entity<Guid>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public required string ChangeType { get; set; }
        public string? Changes { get; set; }
        public string? ChangeReason { get; set; }
        public required DateTime RevisionDate { get; set; }
        public required DateTime ApprovalDate { get; set; }
        public string? ApprovedBy { get; set; }

    }
}

