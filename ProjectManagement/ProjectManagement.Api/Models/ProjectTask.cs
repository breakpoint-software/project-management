namespace ProjectManagement.Api.Models;

public class ProjectTask
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public TaskStatus Status { get; set; }
    public int ProjectId { get; set; }
    public DateTime? DueDate { get; set; }
    public Project? Project { get; set; }
}
