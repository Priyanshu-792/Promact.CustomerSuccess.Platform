using Promact.CustomerSuccess.Platform.Dtos;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class StakeHoldersService :
        CrudAppService<
            StakeHolders,
            StakeHoldersDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateStakeHoldersDto,
            UpdateStakeHoldersDto>,
        IStakeHoldersService
    {
        public StakeHoldersService(IRepository<StakeHolders, Guid> repository) : base(repository)
        {
        }
    }
}
