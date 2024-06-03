package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProjectDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectTeamCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateProyectRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/proyectos")
public class ProjectController {

    private final ProjectService proyectoService;

    public ProjectController(ProjectService proyectoService) { this.proyectoService = proyectoService; }

    @GetMapping("/deIdentifier")
    public ResponseEntity<ProjectDTO> proyectoDetails(@RequestParam String identifier) {
        ProjectTeamCourseQueryResult result = proyectoService.getProjectWithTeamAndCourseByIdentifier(identifier);

        return new ResponseEntity<>(result.toProjectDTO(), HttpStatus.OK);
    }

    @PostMapping("/crearProyecto")
    public ResponseEntity<ProjectTeamCourseQueryResult> crearProyecto(Principal principal, @RequestBody CreateProyectRequest request) {
        ProjectTeamCourseQueryResult result = proyectoService.createProject(principal, request);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/deUsuario")
    public ResponseEntity<List<Project>> proyectosDeUsuario(@RequestParam String username) {
        List<Project> proyectos = proyectoService.getProjectsByUser(username);

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/deEquipo")
    public ResponseEntity<List<Project>> proyectosDeEquipo(@RequestParam String teamIdentifier) {
        List<Project> proyectos = proyectoService.getProjectsByTeam(teamIdentifier);

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/deCurso")
    public ResponseEntity<List<Project>> proyectosDeCurso(@RequestParam String courseIdentifier) {
        List<Project> proyectos = proyectoService.getProjectsByCourse(courseIdentifier);

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @GetMapping("/misProyectos")
    public ResponseEntity<List<Project>> misProyectos(Principal principal) {
        List<Project> proyectos = proyectoService.getProjectsByUser(principal.getName());

        return new ResponseEntity<>(proyectos, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarProyecto")
    public ResponseEntity<Void> eliminarProyecto(Principal principal, @RequestParam String identifier) {
        proyectoService.deleteProject(principal, identifier);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
