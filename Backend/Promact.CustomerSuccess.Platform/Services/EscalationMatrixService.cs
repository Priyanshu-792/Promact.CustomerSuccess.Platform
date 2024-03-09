using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class EscalationMatrixService : CrudAppService<
        EscalationMatrix,
        EscalationMatrixDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateEscalationMatrixDto,
        UpdateEscalationMatrixDto>,
        IEscalationMatrixService
    {
        public EscalationMatrixService(IRepository<EscalationMatrix, Guid> repository)
          : base(repository)
        {
        }

      
    }
}
