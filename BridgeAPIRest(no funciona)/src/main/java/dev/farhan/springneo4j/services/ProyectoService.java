package dev.farhan.springneo4j.services;
import dev.farhan.springneo4j.models.Proyecto;
import dev.farhan.springneo4j.repositories.ProyectoRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;


public class ProyectoService {

    private final ProyectoRepository proyectoRepository;

    public ProyectoService(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    public List<Proyecto> getAllProyectos() {
        return proyectoRepository.findAll();
    }

    public Proyecto getProyectoByIdentifier(String identifier) {
        return proyectoRepository.findProyectoByIdentifier(identifier).orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

}
