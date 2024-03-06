using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ApprovedTeam : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public Guid Id { get; set; }  // unique or primary key
        public int Phase { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public int Duration { get; set; }
    }
}