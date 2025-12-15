using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.Api.Data;
using ProjectManagement.Api.Models;

namespace ProjectManagement.Api.Services
{
    public class ProjectService : IProjectService
    {
        private ProjectManagementContext _context;
        private IMapper _mapper;

        public ProjectService(ProjectManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProjectDto> CreateAsync(ProjectDto dto)
        {
            _context.Projects.Add(_mapper.Map<Project>(dto));
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

        public async Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            return  _context.Projects.Include(p => p.Tasks).ProjectTo<ProjectDto>(_mapper.ConfigurationProvider);
        }

        public async Task<ProjectDto> GetByIdAsync(int id)
        {
            return _mapper.Map<ProjectDto>(await _context.Projects.Include(p => p.Tasks).FirstOrDefaultAsync(p => p.Id == id));

        }

        public async Task<bool> UpdateAsync(int id, ProjectDto dto)
        {
            var entity = await _context.Projects.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (entity == null)
                return false;

            _mapper.Map(dto, entity);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
