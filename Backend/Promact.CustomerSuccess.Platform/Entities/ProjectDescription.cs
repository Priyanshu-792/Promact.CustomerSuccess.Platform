
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectDescription : Entity<Guid>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }

        public virtual Project? Project { get; set; }

        public string Description { get; set; }

    
    }
}
