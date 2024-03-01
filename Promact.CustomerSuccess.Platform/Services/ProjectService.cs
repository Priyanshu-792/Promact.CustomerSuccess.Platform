using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectService :
        CrudAppService<Project, 
            ProjectDto, 
            Guid, 
            PagedAndSortedResultRequestDto, 
            CreateProjectDto, 
            UpdateProjectDto>, 
        IProjectService
    {             
        public ProjectService(IRepository<Project, Guid> projectRepository) : 
            base(projectRepository)
        {              
        }                
    }
}
