using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.Api.Data;
using ProjectManagement.Api.Models;
using ProjectManagement.Api.Services;
using System.Threading.Tasks;

namespace ProjectManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _service;

    public TasksController(ITaskService service )
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectTaskDto>>> GetTasks([FromQuery] int? projectId)
    {
        if (projectId.HasValue)
        {
            var tasks = await _service.GetAllByProjectAsync(projectId.Value);
            return Ok(tasks);
        }

        var allTasks = await _service.GetAllAsync();
        return Ok(allTasks);
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectTaskDto>> GetTask(int id)
    {
        var task = _service.GetByIdAsync(id);
        if (task == null)
        {
            return NotFound();
        }   

        return Ok(task);
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<ProjectTask>> CreateTask(ProjectTaskDto task)
    {
        await _service.CreateAsync(task);

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, ProjectTaskDto task)
    {
        if (id != task.Id)
        {
            return BadRequest();
        }
        if (!await _service.UpdateAsync(id, task))
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        if (!await _service.DeleteAsync(id))
            return NotFound();
        return NoContent();
    }
}
