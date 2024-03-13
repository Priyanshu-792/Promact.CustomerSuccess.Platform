using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RiskProfile : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public RiskType RiskType { get; set; }
        public RiskSeverity Severity { get; set; }
        public RiskImpact Impact { get; set; }
        public string? Description { get; set; }
        public string? RemedialSteps { get; set; }
        public string? Status { get; set; }
        public DateTime DateReceived { get; set; }

        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}