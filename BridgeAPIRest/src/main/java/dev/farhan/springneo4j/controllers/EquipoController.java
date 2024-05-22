package dev.farhan.springneo4j.controllers;
import dev.farhan.springneo4j.models.Equipo;
import dev.farhan.springneo4j.objects.EquipoDTO;
import dev.farhan.springneo4j.services.EquipoService;
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
public class EquipoController {

    private final EquipoService equipoService;


    public EquipoController(EquipoService equipoService) {
        this.equipoService = equipoService;
    }

    @GetMapping("/")
    public ResponseEntity<List<EquipoDTO>> equipoIndex() {
        List<Equipo> equipos = equipoService.getAllEquipos();
        List<EquipoDTO> equiposResponse = equipos.stream().map(
                    (equipo) -> {EquipoDTO responseEquipo = new EquipoDTO(equipo.getEstudiantes(), equipo.getCurso());
                    return responseEquipo; }
                    ).collect(Collectors.toList());
        return new ResponseEntity<>(equiposResponse, HttpStatus.OK);
    }

    @GetMapping("/{indentifier}")
    public ResponseEntity<EquipoDTO> equipoDetails(@PathVariable String identifier) {
        Optional<Equipo> equipo = equipoService.getEquipoByIdentifier(identifier);
        EquipoDTO responseEquipo = new EquipoDTO(equipo.get().getEstudiantes(), equipo.get().getCurso());
        return new ResponseEntity<>(responseEquipo, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<EquipoDTO>> getEquiposByUser(@PathVariable String username) {
        List<Equipo> equipos = equipoService.getEquiposByEstudiante(username);
        List<EquipoDTO> equiposResponse = equipos.stream().map(
                                    (equipo) -> {EquipoDTO responseEquipo = new EquipoDTO(equipo.getEstudiantes(), equipo.getCurso());
                                    return responseEquipo;}
                ).collect(Collectors.toList());
        return new ResponseEntity<>(equiposResponse, HttpStatus.OK);
    }
}
