using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class VersionHistoryService :
        CrudAppService<
            VersionHistory,
            VersionHistoryDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateVersionHistoryDto,
            UpdateVersionHistoryDto>,
        IVersionHistoryService
    {
        public VersionHistoryService(IRepository<VersionHistory, Guid> versionHistoryRepository) :
            base(versionHistoryRepository)
        {
        }
    }
}
