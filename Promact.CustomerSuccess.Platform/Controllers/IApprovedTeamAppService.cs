using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Controllers
{
    internal interface IApprovedTeamAppService
    {
        Task<ApprovedTeamDto> CreateAsync(CreateApprovedTeamDto input);
        Task DeleteAsync(Guid id);
        Task<PagedResultDto<ApprovedTeamDto>> GetListAsync(GetApprovedTeamsInput input);
        Task<ApprovedTeamDto> UpdateAsync(Guid id, UpdateApprovedTeamDto input);
    }
}