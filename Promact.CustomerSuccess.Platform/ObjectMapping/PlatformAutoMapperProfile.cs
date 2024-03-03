using AutoMapper;
using Promact.CustomerSuccess.Platform.Dtos;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();


        /*create automapper object for project Resources*/
        CreateMap<CreateProjectResourcesDto, ProjectResources>();
        CreateMap<UpdateProjectResourcesDto, ProjectResources>();
        CreateMap<ProjectResources, ProjectResourcesDto>().ReverseMap();

        /*create automapper object for ClientFeedback*/
        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();
        CreateMap<ClientFeedback, ClientFeedbackDto>().ReverseMap();

        /*create automapper object for ProjectUpdates*/
        CreateMap<CreateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<UpdateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<ProjectUpdates, ProjectUpdatesDto>().ReverseMap();


              /*create automapper object for MeetingMinute*/
        CreateMap<CreateMeetingMinuteDto, MeetingMinute>();
        CreateMap<UpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();

    }
}
