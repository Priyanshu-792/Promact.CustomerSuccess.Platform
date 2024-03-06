using AutoMapper.Internal.Mappers;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class MeetingMinuteService :
        CrudAppService<
            MeetingMinute, // The entity type
            MeetingMinuteDto,              
            Guid,                          
            PagedAndSortedResultRequestDto, 
            CreateMeetingMinuteDto,       
            UpdateMeetingMinuteDto>,     
        IMeetingMinuteService           
    {
        public MeetingMinuteService(IRepository<MeetingMinute, Guid> meetingMinuteRepository)
            : base(meetingMinuteRepository)
        {

        }
    }
}