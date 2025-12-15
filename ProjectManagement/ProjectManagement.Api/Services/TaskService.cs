using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.Api.Data;
using ProjectManagement.Api.Models;

namespace ProjectManagement.Api.Services
{
    public class TaskService : ITaskService
    {
        private ProjectManagementContext _context;
        private IMapper _mapper;

        public TaskService(ProjectManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProjectTaskDto> CreateAsync(ProjectTaskDto dto)
        {
            _context.Tasks.Add(_mapper.Map<ProjectTask>(dto));
            await _context.SaveChangesAsync();
            return dto;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return false; // or throw if you prefer

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<IEnumerable<ProjectTaskDto>> GetAllAsync()
        {
            return  _context.Projects.Include(p => p.Tasks).ProjectTo<ProjectTaskDto>(_mapper.ConfigurationProvider);
        }

        public async Task<IEnumerable<ProjectTaskDto>> GetAllByProjectAsync(int projectId )
        {
            return await _context.Tasks.Where(t => t.ProjectId == projectId).ProjectTo<ProjectTaskDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<ProjectTaskDto> GetByIdAsync(int id)
        {
            return _mapper.Map<ProjectTaskDto>(await _context.Projects.Include(p => p.Tasks).FirstOrDefaultAsync(p => p.Id == id));

        }

        public async Task<bool> UpdateAsync(int id, ProjectTaskDto dto)
        {
            var entity = await _context.Tasks.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (entity == null)
                return false;

            _mapper.Map(dto, entity);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
