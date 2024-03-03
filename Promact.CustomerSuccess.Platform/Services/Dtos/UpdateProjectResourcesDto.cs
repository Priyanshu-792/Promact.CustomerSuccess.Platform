
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Dtos
{
    public class UpdateProjectResourcesDto
    {
        [Required]
        [StringLength(128)]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public Guid ResourceId { get; set; }
        public double AllocationPercentage { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Role { get; set; }
    }
}
