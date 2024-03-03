using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ClientFeedbackService :
   CrudAppService<
            ClientFeedback,
            ClientFeedbackDto,

            Guid,
            PagedAndSortedResultRequestDto,
            CreateClientFeedbackDto,
          UpdateClientFeedbackDto
           >,
        IClientFeedbackService
    {
        public ClientFeedbackService(IRepository<ClientFeedback, Guid> repository) :
            base(repository)
        {
        }
    }
}