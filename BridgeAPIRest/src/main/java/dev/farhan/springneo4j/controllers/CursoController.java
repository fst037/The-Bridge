package dev.farhan.springneo4j.controllers;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.objects.CursoDTO;
import dev.farhan.springneo4j.services.CourseEnrolmentService;
import dev.farhan.springneo4j.services.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/courses")
public class CursoController {
    private final CourseService courseService;
    private final CourseEnrolmentService courseEnrolmentService;

    public CursoController(CourseService courseService, CourseEnrolmentService courseEnrolmentService) {
        this.courseService = courseService;
        this.courseEnrolmentService = courseEnrolmentService;
    }

    @GetMapping("/")
    public ResponseEntity<List<CursoDTO>> courseIndex(Principal principal) {
        List<Curso> curso = courseService.getAllCourses();

        List<CursoDTO> responseCourses = curso.stream().map(
                (course) -> {
                    CursoDTO responseCourse = new CursoDTO();

                    responseCourse.setIdentificador(course.getIdentificador());
                    responseCourse.setTitulo(course.getNombre());
                    responseCourse.setProfesor(course.getProfesor());

                    if (principal != null)
                        responseCourse.setEnrolled(courseEnrolmentService.getEnrolmentStatus(principal.getName(),
                                course.getIdentificador()));

                    return responseCourse;
                }
        ).collect(Collectors.toList());

        return new ResponseEntity<>(responseCourses, HttpStatus.OK);
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<CursoDTO> courseDetails(@PathVariable String identifier, Principal principal) {
        Curso curso = courseService.getCourseByIdentifier(identifier);
        CursoDTO responseCourse = new CursoDTO();

        responseCourse.setIdentificador(curso.getIdentificador());
        responseCourse.setTitulo(curso.getNombre());
        responseCourse.setProfesor(curso.getProfesor());

        if (principal != null)
            responseCourse.setEnrolled(courseEnrolmentService.getEnrolmentStatus(principal.getName(), identifier));

        return new ResponseEntity<>(responseCourse, HttpStatus.OK);
    }
}
