package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import TheBridge.TheBridgeNeo4jApiREST.repositories.CourseRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.ProfessorRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.SubjectRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateCourseRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final SubjectRepository materiaRepository;
    private final UserRepository userRepository;
    private final ProfessorRepository profesorRepository;

    public CourseService(
            CourseRepository courseRepository,
            SubjectRepository materiaRepository,
            UserRepository userRepository,
            ProfessorRepository profesorRepository
    ) {
        this.courseRepository = courseRepository;
        this.materiaRepository = materiaRepository;
        this.userRepository = userRepository;
        this.profesorRepository = profesorRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseByIdentifier(String identifier) {

        return courseRepository.findCourseById(identifier)
                .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

    public Course createCourse(CreateCourseRequest request) {

        if (courseRepository.findCourseById(request.getIdentificador()).isPresent()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }

        Optional<Subject> materia = materiaRepository.findSubjectByName(request.getMateria());

        if (materia.isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }

        Course curso = new Course();
        curso.setIdentificador(request.getIdentificador());
        curso.setMateria(materia.get());
        curso.setEstudiantes(userRepository.findStudentsByEmails(request.getEmailsEstudiantes()));
        curso.setProfesor(profesorRepository.findProfesorByEmail(request.getEmailProfesor())
                .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404))));

        return courseRepository.save(curso);
    }
}
