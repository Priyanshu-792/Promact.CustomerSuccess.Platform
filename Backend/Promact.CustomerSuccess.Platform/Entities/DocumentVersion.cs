using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{

    public class DocumentVersion : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        public required ChangeType ChangeType { get; set; }
        public string? Changes { get; set; }
        public string? ChangeReason { get; set; }
        [ForeignKey(nameof(Document))]
        public Guid DocumentId { get; set; }
        public virtual Document? Document { get; set; }
        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}
