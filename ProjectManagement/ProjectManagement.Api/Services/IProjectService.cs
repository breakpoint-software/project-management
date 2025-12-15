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

    //public abstract class BaseService<Dto> : IBaseService<Dto> where Dto : EntityEntry
    //{
    //    public DbContext Context { get; set; }

    //    protected BaseService(DbContext context)
    //    {
    //        this.Context = context;
    //    }

    //    public async Task<EntityEntry<Dto>> CreateAsync(Dto dto)
    //    {
    //        var result =  await this.Context.AddAsync(dto);
    //        return result;
    //    }

    //    public Task<bool> DeleteAsync(int id)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<IEnumerable<Dto>> GetAllAsync()
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<ProjectDto> GetByIdAsync(int id)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<bool> UpdateAsync(int id, Dto dto)
    //    {
    //        throw new NotImplementedException();
    //    }
    //}
}
