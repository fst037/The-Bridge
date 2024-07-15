package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProjectDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;

import java.util.List;
import java.util.UUID;

public class ProjectWithCourseQueryResult {

    private Project project;
    private Course course;

    public ProjectWithCourseQueryResult() {
    }

    public ProjectWithCourseQueryResult(Project project, Course course) {
        this.project = project;
        this.course = course;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public ProjectDTO toProjectDTO(){
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setIdentifier(project.getIdentifier());
        projectDTO.setTitulo(project.getTitulo());
        projectDTO.setDescripcion(project.getDescripcion());
        projectDTO.setPortadaLink(project.getPortadaLink());
        projectDTO.setLinks(project.getLinks());
        projectDTO.setCurso(course);
        return projectDTO;
    }
}
