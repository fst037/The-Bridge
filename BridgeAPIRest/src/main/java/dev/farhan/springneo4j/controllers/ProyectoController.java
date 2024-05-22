package dev.farhan.springneo4j.controllers;

import dev.farhan.springneo4j.models.Equipo;
import dev.farhan.springneo4j.models.Proyecto;
import dev.farhan.springneo4j.objects.ProyectoDTO;
import dev.farhan.springneo4j.services.ProyectoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/proyectos")
public class ProyectoController {
    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @GetMapping("/")
    public ResponseEntity<List<ProyectoDTO>> proyectoIndex() {

        List<Proyecto> proyectos = proyectoService.getAllProyectos();

        List<ProyectoDTO> proyectosResponse = proyectos.stream().map(
                (proyecto) -> {ProyectoDTO responseProyecto = new ProyectoDTO(proyecto.getId(), proyecto.getTitulo(), proyecto.getDescripcion(), proyecto.getEquipo());
                return responseProyecto; }).collect(Collectors.toList());

        return new ResponseEntity<>(proyectosResponse, HttpStatus.OK);
    }

    @GetMapping("/{indentifier}")
    public ResponseEntity<ProyectoDTO> proyectoDetails(@PathVariable String identifier) {

        Proyecto proyecto = proyectoService.getProyectoByIdentifier(identifier);

        ProyectoDTO responseProyecto = new ProyectoDTO(proyecto.getId(), proyecto.getTitulo(), proyecto.getDescripcion(), proyecto.getEquipo());

        return new ResponseEntity<>(responseProyecto, HttpStatus.OK);
    }

}
