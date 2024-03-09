using AutoMapper;
using Promact.CustomerSuccess.Platform.Dtos;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectBudgetService :
         CrudAppService<
             ProjectBudget,              // The entity
             ProjectBudgetDto,           // DTO used for reading data
             Guid,                       // Primary key of the entity
             PagedAndSortedResultRequestDto, // Used for sorting and paging
             CreateProjectBudgetDto,     // DTO used for creating the entity
             UpdateProjectBudgetDto>,    // DTO used for updating the entity
         IProjectBudgetService           // The contract defining the service
    {
        public ProjectBudgetService(IRepository<ProjectBudget, Guid> ProjectBudgetRepository)
         : base(ProjectBudgetRepository)
        {

        }
    }
}
