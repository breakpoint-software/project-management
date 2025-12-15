namespace ProjectManagement.Api.Models;

public class ProjectTaskDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public TaskStatus Status { get; set; }
    public int ProjectId { get; set; }
    public DateTime? DueDate { get; set; }
    public ProjectDto? Project { get; set; }
}
