using Microsoft.EntityFrameworkCore;
using ProjectManagement.Api.Models;

namespace ProjectManagement.Api.Data;

public class ProjectManagementContext : DbContext
{
    public ProjectManagementContext(DbContextOptions<ProjectManagementContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectTask> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired();
            entity.HasMany(e => e.Tasks)
                  .WithOne(e => e.Project)
                  .HasForeignKey(e => e.ProjectId);
        });

        modelBuilder.Entity<ProjectTask>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired();
        });

        // Seed data
        modelBuilder.Entity<Project>().HasData(
            new Project { Id = 1, Name = "Website Redesign", Description = "Redesign company website", Status = ProjectStatus.InProgress },
            new Project { Id = 2, Name = "Mobile App Development", Description = "Develop mobile app for iOS and Android", Status = ProjectStatus.NotStarted }
        );

        modelBuilder.Entity<ProjectTask>().HasData(
            new ProjectTask { Id = 1, Title = "Create wireframes", Description = "Design initial wireframes", Status = Models.TaskStatus.Done, ProjectId = 1, DueDate = DateTime.Now.AddDays(-5) },
            new ProjectTask { Id = 2, Title = "Develop homepage", Description = "Build the new homepage", Status = Models.TaskStatus.InProgress, ProjectId = 1, DueDate = DateTime.Now.AddDays(7) },
            new ProjectTask { Id = 3, Title = "Setup project structure", Description = "Initialize the mobile app project", Status = Models.TaskStatus.Todo, ProjectId = 2, DueDate = DateTime.Now.AddDays(14) }
        );
    }
}
