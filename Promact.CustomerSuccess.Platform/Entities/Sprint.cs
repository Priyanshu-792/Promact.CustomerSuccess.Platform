using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Sprint : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("PhaseMilestone")]
        public Guid PhaseMilestoneId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public SprintStatus Status { get; set; }
        public required string Comments { get; set; }
        public required string Goals { get; set; }
        public int SprintNumber { get; set; }
        public virtual PhaseMilestone? PhaseMilestone { get; set; }
        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}