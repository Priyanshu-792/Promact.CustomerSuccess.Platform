
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Dtos
{
    public class UpdateProjectResourcesDto
    {
        [Required]

        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        //public Guid ResourceId { get; set; }
        public string ResourceName { get; set; }
        public double AllocationPercentage { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Role { get; set; }
        public string Comment { get; set; }
    }
}
