using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class DocumentVersionService :
         CrudAppService<
             DocumentVersion,                // The entity
             DocumentVersionDto,             // DTO used for reading data
             Guid,                           // Primary key of the entity
             PagedAndSortedResultRequestDto, // Used for sorting and paging
             CreateDocumentVersionDto,       // DTO used for creating the entity
             UpdateDocumentVersionDto>,      // DTO used for updating the entity
         IDocumentVersionService            // The contract defining the service
    {
        public DocumentVersionService(IRepository<DocumentVersion, Guid> repository)
            : base(repository)
        {
        }
    }
}
