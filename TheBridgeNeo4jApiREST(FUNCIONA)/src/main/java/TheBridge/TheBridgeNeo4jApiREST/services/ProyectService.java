package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Proyect;
import TheBridge.TheBridgeNeo4jApiREST.repositories.CourseRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.ProyectRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.TeamRepository;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateProyectRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProyectService {
    private final ProyectRepository proyectoRepository;
    private final TeamRepository teamRepository;
    private final CourseRepository courseRepository;

    public ProyectService(ProyectRepository proyectoRepository, TeamRepository teamRepository, CourseRepository courseRepository) {
        this.proyectoRepository = proyectoRepository;
        this.teamRepository = teamRepository;
        this.courseRepository = courseRepository;
    }

    public List<Proyect> getAllProyectos() {
        return proyectoRepository.findAll();
    }

    public Proyect getProyectoByIdentifier(String identifier) {
        return proyectoRepository.findProyectByIdentifier(identifier).orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

    public Proyect createProyect(CreateProyectRequest request) {
        Proyect proyecto = new Proyect(
                request.getTitulo(),
                request.getDescripcion(),
                teamRepository.findTeamByIdentifier(request.getEquipo())
                        .orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404))),
                courseRepository.findCourseById(request.getCurso())
                        .orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404))));

        proyecto.setFotos(request.getFotos());
        proyecto.setLinks(request.getLinks());

        return proyectoRepository.save(proyecto);
    }
}
