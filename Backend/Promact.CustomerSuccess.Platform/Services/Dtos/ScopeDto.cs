using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Dtos
{
    public class ScopeDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string Technology { get; set; }
        public string ScopeDetails { get; set; }
    }
}
