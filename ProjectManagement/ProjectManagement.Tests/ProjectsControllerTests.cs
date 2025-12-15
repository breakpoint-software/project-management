using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using ProjectManagement.Api.Controllers;
using ProjectManagement.Api.Data;
using ProjectManagement.Api.Models;
using ProjectManagement.Api.Profiles;
using ProjectManagement.Api.Services;

namespace ProjectManagement.Tests;

public class ProjectsControllerTests
{
    //Mock<IProjectService> _mockService = null;

    private static IMapper CreateMapper()
    {
        ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
        });
        var config = new MapperConfiguration(cfg => { cfg.AddProfile<MappingProfile>(); }, loggerFactory);

        config.AssertConfigurationIsValid();

        return config.CreateMapper();
    }

    private Mock<IProjectService> CreateService(ProjectManagementContext context)
    {
       var mapper = CreateMapper();
        var _mockService =  new Mock<IProjectService>();
        return _mockService;
    }
    private ProjectsController CreateController()
    {
        var s = new ProjectsController(CreateService(GetInMemoryContext()).Object);
        return s;
    }
    private ProjectsController CreateController(IProjectService service)
    {
        return  new ProjectsController(service);
    }

    private ProjectManagementContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<ProjectManagementContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new ProjectManagementContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    [Fact]
    public async Task GetProjects_ReturnsAllProjects()
    {
        // Arrange
        var context = GetInMemoryContext();
        var service = new ProjectService(context, CreateMapper());
        var controller = CreateController(service);

        // Act
        var result = await controller.GetProjects();

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>().Subject.Value.Should().BeAssignableTo<IEnumerable<ProjectDto>>().Subject.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetProject_WithValidId_ReturnsProject()
    {
        // Arrange
        var context = GetInMemoryContext();
        var service = new ProjectService(context, CreateMapper());
        var controller = CreateController(service);

        // Act
        var result = await controller.GetProject(1);

        // Assert
        var value = result.Result.Should().BeOfType<OkObjectResult>().Subject.Value.Should().BeAssignableTo<ProjectDto>().Subject;
        value.Name.Should().Be("Website Redesign");
    }

    [Fact]
    public async Task GetProject_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var context = GetInMemoryContext();
        var controller = CreateController();

        // Act
        var result = await controller.GetProject(999);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task CreateProject_AddsNewProject()
    {
        // Arrange
        var context = GetInMemoryContext();
        var service = new ProjectService(context, CreateMapper());
        
        var controller = CreateController(service);
        var newProject = new ProjectDto
        {
            Name = "New Project",
            Description = "Test Description",
            Status = ProjectStatus.NotStarted
        };

        // Act
        var result = await controller.CreateProject(newProject);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
        context.Projects.Should().HaveCount(3);
    }

    [Fact]
    public async Task CreateProject_WithEmptyName_ReturnsBadRequest()
    {
        // Arrange
        var context = GetInMemoryContext();
        var controller =    CreateController();
        var invalidProject = new ProjectDto
        {
            Name = null, 
            Description = "Test Description",
            Status = ProjectStatus.NotStarted
        };

        // Act
        var result = await controller.CreateProject(invalidProject);

        // Assert
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public async Task DeleteProject_RemovesProject()
    {
        // Arrange
        var context = GetInMemoryContext();
        var service = new ProjectService(context, CreateMapper());
        var controller = CreateController(service);

        // Act
        var result = await controller.DeleteProject(1);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        context.Projects.Should().HaveCount(1);
    }
}
