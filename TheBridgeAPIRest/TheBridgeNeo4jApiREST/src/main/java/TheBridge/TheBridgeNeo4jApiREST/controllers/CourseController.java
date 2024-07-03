package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.CourseDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CoursesOfSubjectQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddUsersToCourseRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cursos")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/deCodigo")
    public ResponseEntity<Course> getCourseByCode(@RequestParam String code) {
        Course course = courseService.getCourseByCode(code);

        if (course == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @GetMapping("/misCursos")
    public ResponseEntity<List<Course>> getMyCourses(Principal principal) {
        List<Course> courses = courseService.getCoursesOfUser(principal.getName());

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/deIdenfifier")
    public ResponseEntity<Course> getCourseByIdentifier(@RequestParam String identifier) {
        Course course = courseService.getCourseByIdentifier(identifier);

        if (course == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @GetMapping("/deMateria")
    public ResponseEntity<CoursesOfSubjectQueryResult> getCoursesOfSubject(@RequestParam String subjectCode) {
        CoursesOfSubjectQueryResult courses = courseService.getCoursesOfSubject(subjectCode);

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping("/crearCurso")
    public ResponseEntity<CoursesOfSubjectQueryResult> createCourse(@RequestParam String code, @RequestParam String name, @RequestParam String shift, @RequestParam String day, @RequestParam String period) {
        CoursesOfSubjectQueryResult courses = courseService.createCourse(code, name, shift, day, period);

        return new ResponseEntity<>(courses, HttpStatus.CREATED);
    }

    @PostMapping("/agregarCursoAMateria")
    public ResponseEntity<CoursesOfSubjectQueryResult> addCourseToSubject(@RequestParam String courseCode, @RequestParam String subjectCode) {
        CoursesOfSubjectQueryResult course = courseService.addCourseToSubject(courseCode, subjectCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @DeleteMapping("/quitarCursoAMateria")
    public ResponseEntity<CoursesOfSubjectQueryResult> removeCourseFromSubject(@RequestParam String courseCode, @RequestParam String subjectCode) {
        CoursesOfSubjectQueryResult course = courseService.removeCourseFromSubject(courseCode, subjectCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @GetMapping("/usuariosDeCurso")
    public ResponseEntity<CourseDTO> getUsersOfCourse(@RequestParam String courseCode) {
        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/agregarUsuarioACurso")
    public ResponseEntity<CourseDTO> addUserToCourse(@RequestParam String username, @RequestParam String courseCode) {
        courseService.addUserToCourse(username, courseCode);

        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/agregarVariosUsuariosACurso")
    public ResponseEntity<CourseDTO> addUsersToCourse(@RequestBody AddUsersToCourseRequest request) {
        String courseCode = request.getCourseCode();

        List<String> courseUsers = courseService.getUsersOfCourse(courseCode).getUsers().stream().map(UserDTO::getUsername).toList();

        List<String> usernames = request.getUsernames();

        usernames.removeAll(courseUsers);

        for (String username: usernames) {
            courseService.addUserToCourse(username, courseCode);
        }

        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/agregarUsuarioAVariosCursos")
    public ResponseEntity<List<Course>> addUserToCourses(Principal principal, @RequestBody List<String> courseCodes) {
        List<Course> oldCourses = courseService.getCoursesOfUser(principal.getName());

        List<String> oldCourseCodes = oldCourses.stream().map(Course::getCode).toList();

        courseCodes.removeAll(oldCourseCodes);

        List<Course> courses = courseService.addUserToCourses(principal.getName(), courseCodes);

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/obtenerDisponibilidad")
    public ResponseEntity<Boolean> getUserAvailabilityInCourse(Principal principal, @RequestParam String courseCode) {
        boolean disponibilidad = courseService.getUserAvailabilityInCourse(principal.getName(), courseCode);

        return new ResponseEntity<>(disponibilidad, HttpStatus.OK);
    }

    @PatchMapping("/marcarDisponibilidad")
    public ResponseEntity<String> setUserAvailabilityInCourse(Principal principal, @RequestParam String courseCode, @RequestParam boolean disponibilidad) {
        boolean result = courseService.setUserAvailabilityInCourse(principal.getName(), courseCode, disponibilidad);

        if (!result) {
            return new ResponseEntity<>("No se encontró el usuario en el curso", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Se marco la disponibilidad como " + disponibilidad + " correctamente.", HttpStatus.OK);
    }

    @DeleteMapping("/quitarUsuarioACurso")
    public ResponseEntity<CourseDTO> removeUserFromCourse(@RequestParam String username, @RequestParam String courseCode) {
        courseService.removeUserFromCourse(username, courseCode);

        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }



}
