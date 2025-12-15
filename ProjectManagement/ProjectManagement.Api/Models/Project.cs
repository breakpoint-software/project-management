using System.ComponentModel.DataAnnotations;

namespace ProjectManagement.Api.Models;

public class Project
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } 
    public string Description { get; set; }
    public ProjectStatus Status { get; set; }
    public ICollection<ProjectTask> Tasks { get; set; } 
}
