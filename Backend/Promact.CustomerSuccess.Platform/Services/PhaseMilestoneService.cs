using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class PhaseMilestoneService :
        CrudAppService<
            PhaseMilestone,               // The entity type
            PhaseMilestoneDto,            // DTO for retrieving data
            Guid,                         // Primary key type
            PagedAndSortedResultRequestDto, // Used for sorting and paging
            CreatePhaseMilestoneDto,      // DTO for creating data
            UpdatePhaseMilestoneDto>,     // DTO for updating data
        IPhaseMilestoneService           // Contract defining the service
    {
        public PhaseMilestoneService(IRepository<PhaseMilestone, Guid> PhaseMilestonerepository)
            : base(PhaseMilestonerepository)
        {
        }
    }
}
