using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class DocumentDto : EntityDto<Guid>
    {
        [Required]
        public Guid ProjectId { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
