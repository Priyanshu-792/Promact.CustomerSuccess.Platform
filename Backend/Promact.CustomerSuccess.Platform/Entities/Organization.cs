using Volo.Abp.Domain.Entities;
using Volo.Abp.MultiTenancy;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Organization : Entity<Guid>, IMultiTenant
    {
        public required string Name { get; set; }
        public Guid? TenantId { get; set; }
        public virtual ICollection<ApplicationUser>? Users { get; set; }
    }
}
