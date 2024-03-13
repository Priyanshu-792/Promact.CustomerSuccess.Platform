using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class AuditHistoryService :
         CrudAppService<
             AuditHistory,                // The entity
             AuditHistoryDto,             // DTO used for reading data
             Guid,                        // Primary key of the entity
             PagedAndSortedResultRequestDto, // Used for sorting and paging
             CreateAuditHistoryDto,       // DTO used for creating the entity
             UpdateAuditHistoryDto>,      // DTO used for updating the entity
         IAuditHistoryService            // The contract defining the service
    {
  
        public AuditHistoryService(IRepository<AuditHistory, Guid> auditHistoryRepository)
        : base(auditHistoryRepository)
        {

        }
    }
}
