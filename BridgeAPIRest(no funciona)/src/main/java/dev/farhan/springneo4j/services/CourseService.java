package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.Materia;
import dev.farhan.springneo4j.repositories.CourseRepository;
import dev.farhan.springneo4j.repositories.MateriaRepository;
import dev.farhan.springneo4j.repositories.ProfesorRepository;
import dev.farhan.springneo4j.repositories.UserRepository;
import dev.farhan.springneo4j.requests.CargarCursoRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final MateriaRepository materiaRepository;
    private final UserRepository userRepository;
    private final ProfesorRepository profesorRepository;

    public CourseService(
            CourseRepository courseRepository,
            MateriaRepository materiaRepository,
            UserRepository userRepository,
            ProfesorRepository profesorRepository
    ) {
        this.courseRepository = courseRepository;
        this.materiaRepository = materiaRepository;
        this.userRepository = userRepository;
        this.profesorRepository = profesorRepository;
    }

    public List<Curso> getAllCourses() {
        return courseRepository.findAll();
    }

    public Curso getCourseByIdentifier(String identifier) {

        return courseRepository.findCourseByIdentifier(identifier)
                .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

    public Curso createCourse(CargarCursoRequest request) {

        if (courseRepository.findCourseByIdentifier(request.getIdentificador()).isPresent()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }

        Optional<Materia> materia = materiaRepository.findMateriaByNombre(request.getMateria());

        if (materia.isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }

        Curso curso = new Curso();
        curso.setIdentificador(request.getIdentificador());
        curso.setMateria(materia.get());
        curso.setEstudiantes(userRepository.findEstudiantesByEmails(request.getEmailsEstudiantes()));
        curso.setProfesor(profesorRepository.findProfesorByEmail(request.getEmailProfesor())
                .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404))));

        return courseRepository.save(curso);
    }
}
