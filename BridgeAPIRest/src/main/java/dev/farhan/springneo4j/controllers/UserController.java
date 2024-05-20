package dev.farhan.springneo4j.controllers;

import dev.farhan.springneo4j.models.Comentario;
import dev.farhan.springneo4j.models.Estudiante;
import dev.farhan.springneo4j.models.Valoracion;
import dev.farhan.springneo4j.objects.ComentarioDTO;
import dev.farhan.springneo4j.objects.EstudianteDTO;
import dev.farhan.springneo4j.objects.ValoracionDTO;
import dev.farhan.springneo4j.requests.AddComentarioRequest;
import dev.farhan.springneo4j.requests.AddValoracionRequest;
import dev.farhan.springneo4j.requests.CreateUserRequest;
import dev.farhan.springneo4j.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String loggedInUserDetails(Principal principal) {
        return principal.getName();
    }

    @PostMapping("/register")
    public ResponseEntity<EstudianteDTO> signUp(@RequestBody CreateUserRequest request) {
        Estudiante estudiante = userService.createUser(request);

        EstudianteDTO responseUser = new EstudianteDTO(estudiante.getNombre(), estudiante.getUsername(), estudiante.getRoles(), estudiante.getComentarios(), estudiante.getValoraciones());

        return new ResponseEntity<>(responseUser, HttpStatus.CREATED);
    }

    @GetMapping("/estudiante/{email}")
    public ResponseEntity<EstudianteDTO> getEstudianteByEmail(@PathVariable String email) {
        Estudiante estudiante = userService.getEstudianteByEmail(email);

        EstudianteDTO responseUser = new EstudianteDTO(estudiante.getNombre(), estudiante.getEmail(), estudiante.getRoles(), estudiante.getComentarios(), estudiante.getValoraciones());

        return new ResponseEntity<>(responseUser, HttpStatus.OK);
    }

    @GetMapping("/curso/{identificador}/estudiantes")
    public ResponseEntity<List<EstudianteDTO>> getCursoEstudiantes(@PathVariable String identificador) {
        List<Estudiante> students = userService.getEstudiantesDeCurso(identificador);

        List<EstudianteDTO> responseStudents = students.stream().map(
                (student) -> new EstudianteDTO(student.getNombre(), student.getEmail(), student.getRoles(), student.getComentarios(), student.getValoraciones())
        ).collect(Collectors.toList());

        return new ResponseEntity<>(responseStudents, HttpStatus.OK);
    }

    @PostMapping("/comentarPerfil")
    public ResponseEntity<ComentarioDTO> addCommentarioAEstudiante(Principal principal, @RequestBody AddComentarioRequest comentarioRequest) {
        Estudiante remitente = userService.getEstudianteByEmail(principal.getName());
        Estudiante destinatario = userService.getEstudianteByEmail(comentarioRequest.getDestinatario());

        //TODO: Add validation to check if the comment is not toxic
        userService.addComentarioToEstudiante(destinatario.getEmail(), new Comentario(comentarioRequest.getMensaje(), remitente));

        ComentarioDTO responseComment = new ComentarioDTO(comentarioRequest.getMensaje(), remitente.getNombre());

        return new ResponseEntity<>(responseComment, HttpStatus.CREATED);
    }

    @PostMapping("/valorarPerfil")
    public ResponseEntity<ValoracionDTO> addValoracionAEstudiante(Principal principal, @RequestBody AddValoracionRequest valoracionRequest) {
        Estudiante remitente = userService.getEstudianteByEmail(principal.getName());
        Estudiante destinatario = userService.getEstudianteByEmail(valoracionRequest.getDestinatario());

        Valoracion valoracion = new Valoracion(
                valoracionRequest.getAptitud1(),
                valoracionRequest.getAptitud2(),
                valoracionRequest.getAptitud3(),
                remitente,
                valoracionRequest.getMensaje()
                );

        userService.addValoracionToEstudiante(destinatario.getEmail(), valoracion);

        ValoracionDTO responseValoracion = new ValoracionDTO(valoracion);

        return new ResponseEntity<>(responseValoracion, HttpStatus.CREATED);
    }

}
