package dev.farhan.springneo4j.controllers;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import dev.farhan.springneo4j.objects.CursoDTO;
import dev.farhan.springneo4j.objects.CourseEnrolmentDTO;
import dev.farhan.springneo4j.queryresults.CourseEnrolmentQueryResult;
import dev.farhan.springneo4j.services.CourseEnrolmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.requests.CourseEnrolmentRequest;

@RestController
@RequestMapping("/api/v1/enrollments")
public class CourseEnrolmentController {
    private final CourseEnrolmentService courseEnrolmentService;

    public CourseEnrolmentController(CourseEnrolmentService courseEnrolmentService) {
        this.courseEnrolmentService = courseEnrolmentService;
    }

    @GetMapping("/")
    public ResponseEntity<List<CursoDTO>> enrollments(Principal principal) {
        List<Curso> cours = courseEnrolmentService.getAllEnrolledCoursesByUsername(principal.getName());

        List<CursoDTO> responseCourses = cours.stream().map(
                (course) -> {
                    CursoDTO responseCourse = new CursoDTO();

                    responseCourse.setIdentificador(course.getIdentificador());
                    responseCourse.setTitulo(course.getNombre());
                    responseCourse.setProfesor(course.getProfesor());
                    responseCourse.setEnrolled(true);

                    return responseCourse;
                }
        ).collect(Collectors.toList());

        return new ResponseEntity<>(responseCourses, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<CourseEnrolmentDTO> enrollIn(@RequestBody CourseEnrolmentRequest request, Principal principal) {
        CourseEnrolmentQueryResult enrolment = courseEnrolmentService.enrollIn(principal.getName(), request.getCourseIdentifier());

        CourseEnrolmentDTO responseEnrolment = new CourseEnrolmentDTO();

        responseEnrolment.setName(enrolment.getUser().getNombre());
        responseEnrolment.setUsername(enrolment.getUser().getUsername());
        responseEnrolment.setCourse(enrolment.getCourse());

        return new ResponseEntity<>(responseEnrolment, HttpStatus.OK);
    }
}
