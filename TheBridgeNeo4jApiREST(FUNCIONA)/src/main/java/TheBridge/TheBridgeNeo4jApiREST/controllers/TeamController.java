package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.services.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/equipos")
public class TeamController {

    private final TeamService equipoService;

    public TeamController(TeamService equipoService) {
        this.equipoService = equipoService;
    }

    @GetMapping("/{indentifier}")
    public ResponseEntity<TeamDTO> equipoDetails(@PathVariable String identifier) {
        Optional<Team> equipo = equipoService.getTeamByIdentifier(identifier);
        TeamDTO responseEquipo = new TeamDTO(equipo.get().getId(),
                equipo.get().getEstudiantes().stream()
                        .map(estudiante -> estudiante.getUsername())
                        .collect(Collectors.toList()));
        return new ResponseEntity<>(responseEquipo, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<TeamDTO>> getEquiposByUser(@PathVariable String username) {
        List<Team> equipos = equipoService.getTeamsByStudent(username);
        List<TeamDTO> equiposResponse = equipos.stream().map(
                (equipo) -> {TeamDTO responseEquipo = new TeamDTO(
                        equipo.getId(),
                        equipo.getEstudiantes().stream()
                                .map(estudiante -> estudiante.getUsername())
                                .collect(Collectors.toList()));
                    return responseEquipo;}
        ).collect(Collectors.toList());
        return new ResponseEntity<>(equiposResponse, HttpStatus.OK);
    }
}
