using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Data;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Users;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ApplicationUser : Entity<Guid>, IUser
    {
        public required string Name { get; set; }

        public required string UserName { get; set; }

        public required string Email { get; set; }

        public required string Surname { get; set;}

        public bool IsActive { get; set; }

        public bool EmailConfirmed { get; set; }

        public required string PhoneNumber { get; set; }

        public bool PhoneNumberConfirmed { get; set; }

        [ForeignKey("Organization")]
        public Guid? TenantId { get; set; }

        public virtual Organization? Organization { get; set; }        

        public ExtraPropertyDictionary ExtraProperties { get; set; }
    }
}
