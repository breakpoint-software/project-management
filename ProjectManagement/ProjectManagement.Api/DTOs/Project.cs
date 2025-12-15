
namespace ProjectManagement.Api.Models;

public class ProjectDto
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public string Description { get; set; }
    public ProjectStatus Status { get; set; }
    public ICollection<ProjectTaskDto> Tasks { get; set; } 
}
