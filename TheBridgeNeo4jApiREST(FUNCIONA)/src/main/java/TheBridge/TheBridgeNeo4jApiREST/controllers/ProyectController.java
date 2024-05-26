package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Proyect;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProyectoDTO;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateProyectRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.ProyectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/proyectos")
public class ProyectController {

    private final ProyectService proyectoService;

    public ProyectController(ProyectService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @GetMapping("/{indentifier}")
    public ResponseEntity<ProyectoDTO> proyectoDetails(@PathVariable String identifier) {
        Proyect proyecto = proyectoService.getProyectoByIdentifier(identifier);

        ProyectoDTO proyectoDTO = new ProyectoDTO(
                proyecto.getId(),
                proyecto.getTitulo(),
                proyecto.getDescripcion(),
                proyecto.getEquipo().getId().toString(),
                proyecto.getCurso().getIdentificador()
        );

        return new ResponseEntity<>(proyectoDTO, HttpStatus.OK);
    }

    @PostMapping("/crearProyecto")
    public ResponseEntity<ProyectoDTO> crearProyecto(@RequestBody CreateProyectRequest request) {
        Proyect proyecto = proyectoService.createProyect(request);
        ProyectoDTO proyectoDTO = new ProyectoDTO(
                proyecto.getId(),
                proyecto.getTitulo(),
                proyecto.getDescripcion(),
                proyecto.getEquipo().getId().toString(),
                proyecto.getCurso().getIdentificador()
        );
        return new ResponseEntity<>(proyectoDTO, HttpStatus.CREATED);
    }

}
