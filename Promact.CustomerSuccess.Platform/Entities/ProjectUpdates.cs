using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectUpdates : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string GeneralUpdates { get; set; }

    }
}