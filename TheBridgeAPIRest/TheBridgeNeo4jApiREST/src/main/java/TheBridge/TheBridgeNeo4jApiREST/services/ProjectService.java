package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectTeamCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.ProjectRepository;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateProyectRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project getProjectByIdentifier(String identifier) {
        return projectRepository.findProjectByIdentifier(identifier)
                .orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

    public List<Project> getProjectsByUser(String username) {
        return projectRepository.findProjectsByUser(username);
    }

    public List<Project> getProjectsByTeam(String teamIdentifier) {
        return projectRepository.findProjectsByTeam(teamIdentifier);
    }

    public List<Project> getProjectsByCourse(String courseIdentifier) {
        return projectRepository.findProjectsByCourse(courseIdentifier);
    }

    public ProjectTeamCourseQueryResult getProjectWithTeamAndCourseByIdentifier(String identifier) {
        return projectRepository.findProjectWithTeamAndCourseByIdentifier(identifier);
    }

    public List<ProjectTeamCourseQueryResult> getProjectWithTeamAndCourseByUser(String username) {
        return projectRepository.findProjectWithTeamAndCourseByUser(username);
    }

    public ProjectTeamCourseQueryResult createProject(Principal principal, CreateProyectRequest request) {

        if (!projectRepository.isUserInCourseAndTeam(principal.getName(), request.getCursoIdentifier(), request.getEquipoIdentifier()).equals(principal.getName())) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(403));
        }

        Project project = new Project(request.getTitulo(), request.getDescripcion());

        project.setPortadaBase64(request.getPortadaBase64());
        project.setLinks(request.getLinks());

        projectRepository.save(project);

        projectRepository.addCourseToProject(project.getIdentifier().toString(), request.getCursoIdentifier());
        projectRepository.addTeamToProject(project.getIdentifier().toString(), request.getEquipoIdentifier());

        return projectRepository.findProjectWithTeamAndCourseByIdentifier(project.getIdentifier().toString());
    }

    public void deleteProject(Principal principal, String identifier) {
        Project project = projectRepository.findProjectByIdentifier(identifier)
                .orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404)));

        if (!projectRepository.findProjectsByUser(principal.getName()).stream().map(Project::getIdentifier).toList().contains(UUID.fromString(identifier)))
        {
            throw new ResponseStatusException(HttpStatusCode.valueOf(403));
        }

        projectRepository.deleteProject(identifier);
    }
}
