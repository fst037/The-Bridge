package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProjectDTO;

import java.util.List;

public class ProjectTeamCourseQueryResult {

    private Project project;
    private Team team;
    private Course course;
    private List<User> members;

    public ProjectTeamCourseQueryResult(Project project, Team team, Course course, List<User> members) {
        this.project = project;
        this.team = team;
        this.course = course;
        this.members = members;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public ProjectDTO toProjectDTO() {
        return new ProjectDTO(
                project.getIdentifier(),
                project.getTitulo(),
                project.getDescripcion(),
                project.getLinks(),
                project.getPortadaLink(),
                team,
                course,
                members.stream().map(User::toUserDTO).toList());
    }
}
