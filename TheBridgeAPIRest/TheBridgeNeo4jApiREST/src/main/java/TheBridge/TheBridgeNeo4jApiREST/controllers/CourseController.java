package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.CourseDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CoursesOfSubjectQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddUsersToCourseRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<CoursesOfSubjectQueryResult> createCourse(@RequestParam String code, @RequestParam String name, @RequestParam String subjectCode) {
        CoursesOfSubjectQueryResult course = courseService.createCourse(code, name, subjectCode);

        return new ResponseEntity<>(course, HttpStatus.CREATED);
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

        for (String username : request.getUsernames()) {
            courseService.addUserToCourse(username, courseCode);
        }

        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @DeleteMapping("/quitarUsuarioACurso")
    public ResponseEntity<CourseDTO> removeUserFromCourse(@RequestParam String username, @RequestParam String courseCode) {
        courseService.removeUserFromCourse(username, courseCode);

        CourseDTO course = courseService.getUsersOfCourse(courseCode);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }



}
