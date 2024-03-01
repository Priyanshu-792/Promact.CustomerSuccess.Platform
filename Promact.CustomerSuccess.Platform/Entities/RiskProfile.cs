using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RiskProfile : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public RiskType RiskType { get; set; }
        public RiskSeverity Severity { get; set; }
        public RiskImpact Impact { get; set; }        
        public virtual ICollection<RemediationStep>? RemediationSteps { get; set; }
        public virtual Project? Project { get; set; }
        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}