using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ProjectManagement.Api.Models;

namespace ProjectManagement.Api.Services
{
    public interface IProjectService : IBaseService<ProjectDto>
    {
     
    }

    public interface ITaskService : IBaseService<ProjectTaskDto>
    {
        Task<IEnumerable<ProjectTaskDto>> GetAllByProjectAsync(int projectId);
    }   

    public interface IBaseService<Dto> 
    {
        Task<IEnumerable<Dto>> GetAllAsync();
        Task<Dto> CreateAsync(Dto dto);
        Task<bool> UpdateAsync(int id, Dto dto);
        Task<bool> DeleteAsync(int id);
        Task<Dto> GetByIdAsync(int id);

    }
}
