package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProjectDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectTeamCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectWithCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateProyectRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/proyectos")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) { this.projectService = projectService; }

    @GetMapping("/deIdentifier")
    public ResponseEntity<ProjectDTO> proyectoDetails(@RequestParam String identifier) {
        ProjectTeamCourseQueryResult result = projectService.getProjectWithTeamAndCourseByIdentifier(identifier);

        return new ResponseEntity<>(result.toProjectDTO(), HttpStatus.OK);
    }

    @PostMapping("/crearProyecto")
    public ResponseEntity<ProjectTeamCourseQueryResult> crearProyecto(Principal principal, @RequestBody CreateProyectRequest request) {
        ProjectTeamCourseQueryResult result = projectService.createProject(principal, request);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/deUsuario")
    public ResponseEntity<List<Project>> proyectosDeUsuario(@RequestParam String username) {
        List<Project> proyectos = projectService.getProjectsByUser(username);

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/deEquipo")
    public ResponseEntity<List<ProjectDTO>> proyectosDeEquipo(@RequestParam String teamIdentifier) {
        List<ProjectDTO> proyectos = projectService.getProjectsByTeam(teamIdentifier).stream().map(ProjectWithCourseQueryResult::toProjectDTO).collect(Collectors.toList());

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/deCurso")
    public ResponseEntity<List<Project>> proyectosDeCurso(@RequestParam String courseIdentifier) {
        List<Project> proyectos = projectService.getProjectsByCourse(courseIdentifier);

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/misProyectos")
    public ResponseEntity<List<ProjectDTO>> misProyectos(Principal principal) {
        List<ProjectDTO> proyectos = projectService.getProjectWithTeamAndCourseByUser(principal.getName())
                .stream().map(ProjectTeamCourseQueryResult::toProjectDTO).collect(Collectors.toList());

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarProyecto")
    public ResponseEntity<Void> eliminarProyecto(Principal principal, @RequestParam String identifier) {
        projectService.deleteProject(principal, identifier);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/cambiarLinkPortada")
    public ResponseEntity<Project> cambiarLinkPortada(@RequestParam String identifier, @RequestParam String portadaLink) {
        Project project = projectService.changeCover(identifier, portadaLink);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PatchMapping("/cambiarTitulo")
    public ResponseEntity<Project> cambiarTitulo(@RequestParam String identifier, @RequestParam String titulo) {
        Project project = projectService.changeTitle(identifier, titulo);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PatchMapping("/cambiarDescripcion")
    public ResponseEntity<Project> cambiarDescripcion(@RequestParam String identifier, @RequestParam String descripcion) {
        Project project = projectService.changeDescription(identifier, descripcion);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping("/agregarLink")
    public ResponseEntity<Project> agregarLink(@RequestParam String identifier, @RequestParam String link) {
        Project project = projectService.addLink(identifier, link);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarLink")
    public ResponseEntity<Project> eliminarLink(@RequestParam String identifier, @RequestParam String link) {
        Project project = projectService.deleteLink(identifier, link);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

}
