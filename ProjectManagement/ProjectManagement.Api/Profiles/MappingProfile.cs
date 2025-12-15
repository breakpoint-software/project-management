using AutoMapper;
using ProjectManagement.Api.Models;

namespace ProjectManagement.Api.Profiles
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // PROJECT

            // Entity -> Read DTO
            CreateMap<Project, ProjectDto>().ReverseMap().ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<ProjectTask, ProjectTaskDto>().ReverseMap().ForMember(dest => dest.Id, opt => opt.Ignore());

        }
    }    
}