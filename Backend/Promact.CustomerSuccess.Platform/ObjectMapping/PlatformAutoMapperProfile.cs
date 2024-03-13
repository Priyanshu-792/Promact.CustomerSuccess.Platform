using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Promact.CustomerSuccess.Platform.Dtos;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();

        /* Create your AutoMapper object mappings here */
        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();

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

        /*create automapper object for ProjectBudget*/
        CreateMap<CreateProjectBudgetDto, ProjectBudget>();
        CreateMap<UpdateProjectBudgetDto, ProjectBudget>();
        CreateMap<ProjectBudget, ProjectBudgetDto>().ReverseMap();


        /*create automapper object for AuditHistoryDto*/
        CreateMap< CreateAuditHistoryDto, AuditHistory >();
        CreateMap< UpdateAuditHistoryDto, AuditHistory >();
        CreateMap<AuditHistory, AuditHistoryDto>().ReverseMap();


        /*create automapper object for DocumentVersionDto*/
        CreateMap<CreateDocumentVersionDto, DocumentVersion>();
        CreateMap<UpdateDocumentVersionDto, DocumentVersion>();
        CreateMap<DocumentVersion, DocumentVersionDto>().ReverseMap();

        /*create automapper object for ProjectDescriptionDto*/
        CreateMap< CreateProjectDescriptionDto, ProjectDescription>();
        CreateMap< UpdateProjectDescriptionDto, ProjectDescription >();
        CreateMap<ProjectDescription, ProjectDescriptionDto>().ReverseMap();


        /*create automapper object for ScopeDto*/
        CreateMap<CreateScopeDto, Scope>();
        CreateMap<UpdateScopeDto, Scope>();
        CreateMap<Scope, ScopeDto>().ReverseMap();

        /*create automapper object for EscalationMatrixDto*/
        CreateMap<CreateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<UpdateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<EscalationMatrix, EscalationMatrixDto>().ReverseMap();

    }
}
