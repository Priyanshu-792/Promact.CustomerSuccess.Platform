using AutoMapper.Internal.Mappers;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ApprovedTeamService :
         CrudAppService<
             ApprovedTeam,    // The entity
             ApprovedTeamDto,           
             Guid,                   
             PagedAndSortedResultRequestDto, 
             CreateApprovedTeamDto,      
             UpdateApprovedTeamDto>,     
         IApprovedTeamService            
    {
        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> approvedTeamRepository)
            : base(approvedTeamRepository)
        {

        }
    }
}