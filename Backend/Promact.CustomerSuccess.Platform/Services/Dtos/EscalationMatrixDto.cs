using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class EscalationMatrixDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public EscalationMatrixLevels Level { get; set; }
        public EscalationType EscalationType { get; set; }
      
    }
}
