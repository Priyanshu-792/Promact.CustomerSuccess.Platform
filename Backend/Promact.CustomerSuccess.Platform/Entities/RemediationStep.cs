using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RemediationStep : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        public required string Description { get; set; }
        [ForeignKey("RiskProfile")]
        public Guid RiskProfileId { get; set; }
        public virtual RiskProfile? RiskProfile { get; set; }
        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}