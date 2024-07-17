package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Comment;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.objects.CommentDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.ValoracionDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CommonBuilderQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddComentarioRequest;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddValoracionRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.InteractionUserService;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/interaccion")
public class InteractionUserController {

    private final InteractionUserService interactionUserService;
    private final UserService userService;

    public InteractionUserController(InteractionUserService interactionUserService, UserService userService) {
        this.interactionUserService = interactionUserService;
        this.userService = userService;
    }

    @PostMapping("/comentarPerfil")
    public ResponseEntity<?> addCommentarioAEstudiante(Principal principal, @RequestBody AddComentarioRequest comentarioRequest) throws IOException {
        User destinatario = userService.getUserByUsername(comentarioRequest.getDestinatario());
        Comment comentario = new Comment(
                comentarioRequest.getMensaje(),
                destinatario
        );

        CommentDTO responseComment;

        String valoracion = comentario.valorarComentario(comentario.getMensaje());

        if (valoracion.equals("Very Positive") || valoracion.equals("Positive") || valoracion.equals("Neutral")) {
            interactionUserService.realizarComentario(principal.getName(), comentario);
            responseComment = new CommentDTO(comentario.getMensaje(), principal.getName(), comentario.getDestinatario().getUsername(), comentario.getTimestamp(), true);
            return new ResponseEntity<>(responseComment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("El comenterio no se realizó porque era tóxico.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/valorarPerfil")
    public ResponseEntity<ValoracionDTO> addValoracionAEstudiante(Principal principal, @RequestBody AddValoracionRequest valoracionRequest) {
        User destinatario = userService.getUserByUsername(valoracionRequest.getDestinatario());

        if (principal.getName().equals(valoracionRequest.getDestinatario())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


        if (valoracionRequest.getVotos().isEmpty() || valoracionRequest.getVotos().size() > 3) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Valoracion valoracion = new Valoracion(
                valoracionRequest.getVotos(),
                destinatario,
                valoracionRequest.getMensaje()
        );

        if (!valoracion.isValid()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        interactionUserService.realizarValoracion(principal.getName(), valoracion);

        ValoracionDTO responseValoracion = new ValoracionDTO(valoracion);

        return new ResponseEntity<>(responseValoracion, HttpStatus.CREATED);
    }

    @GetMapping("/checkRealizoEncuesta")
    public ResponseEntity<Boolean> checkRealizoEncuesta(Principal principal) {
        Boolean respuesta = interactionUserService.checkRealizoEncuesta(principal.getName());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("/enviarEncuestaHabilidades")
    public ResponseEntity<String> enviarEncuestaHabilidades(Principal principal, @RequestBody List<String> votos) {

        if (votos.size() != 10) {
            return new ResponseEntity<>("La encuesta no se pudo enviar. No tiene la longitud necesaria.", HttpStatus.BAD_REQUEST);
        }

        Valoracion valoracion = new Valoracion(
                votos,
                userService.getUserByUsername(principal.getName()),
                "Encuesta de habilidades"
        );

        if (!valoracion.isValid()) {
            return new ResponseEntity<>("La encuesta no se pudo enviar. Los votos no corresponden a las categorias validas.", HttpStatus.BAD_REQUEST);
        }

        interactionUserService.realizarValoracion(principal.getName(), valoracion);


        return new ResponseEntity<>("Se envio la encuesta del usuario " + principal.getName() + " correctamente.",HttpStatus.OK);
    }

    @GetMapping("/misComentarios")
    public ResponseEntity<List<CommentDTO>> getComentariosByUser(Principal principal) {
        List<CommentDTO> comentarios = interactionUserService.getComentariosByUser(principal.getName());

        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    @GetMapping("/misValoraciones")
    public ResponseEntity<HashMap<String, Float>> getValoracionesByUser(Principal principal) {
        HashMap<String, Float> valoraciones = interactionUserService.getSkillsByUsername(principal.getName());

        return new ResponseEntity<>(valoraciones, HttpStatus.OK);
    }

    @PatchMapping("/ocultarComentario")
    public ResponseEntity<Void> ocultarComentario(Principal principal, @RequestParam String remitente, @RequestParam String timestamp) {
        interactionUserService.ocultarComentario(principal, remitente, timestamp);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/mostrarComentario")
    public ResponseEntity<Void> mostrarComentario(Principal principal, @RequestParam String remitente, @RequestParam String timestamp) {
        interactionUserService.mostrarComentario(principal, remitente, timestamp);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/enviarSolicitudBuilder")
    public ResponseEntity<String> enviarSolicitudBuilder(Principal principal, @RequestParam String destinatario) {
        boolean sinErrores = interactionUserService.enviarSolicitudBuilder(principal.getName(), destinatario);

        if (!sinErrores) {
            return new ResponseEntity<>("No se pudo enviar la solicitud a " + destinatario, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Se envio la solicitud a " + destinatario + " correctamente.",HttpStatus.OK);
    }

    @PostMapping("/aceptarSolicitudBuilder")
    public ResponseEntity<List<UserDTO>> aceptarSolicitudBuilder(Principal principal, @RequestParam String remitente) {
        interactionUserService.aceptarSolicitudBuilder(remitente, principal.getName());

        List<UserDTO> builders = interactionUserService.getBuilders(principal.getName());

        return new ResponseEntity<>(builders,HttpStatus.OK);
    }

    @DeleteMapping("/eliminarBuilder")
    public ResponseEntity<List<UserDTO>> eliminarBuilder(Principal principal, @RequestParam String builderEliminado) {
        interactionUserService.eliminarBuilder(principal.getName(), builderEliminado);

        List<UserDTO> builders = interactionUserService.getBuilders(principal.getName());

        return new ResponseEntity<>(builders,HttpStatus.OK);
    }

    @GetMapping("/solicitudesRecibidasBuilder")
    public ResponseEntity<List<UserDTO>> findSolicitudesRecibidasBuilder(Principal principal) {
        List<UserDTO> solicitudes = interactionUserService.getSolicitudesRecibidasBuilder(principal.getName());

        return new ResponseEntity<>(solicitudes, HttpStatus.OK);
    }

    @GetMapping("/misBuilders")
    public ResponseEntity<List<UserDTO>> findBuilders(Principal principal) {
        List<UserDTO> builders = interactionUserService.getBuilders(principal.getName());

        return new ResponseEntity<>(builders, HttpStatus.OK);
    }

    @GetMapping("/buildersEnComun")
    public ResponseEntity<List<CommonBuilderQueryResult>> findBuildersEnComun(Principal principal) {
        List<CommonBuilderQueryResult> builders = interactionUserService.getCommonBuilders(principal.getName());

        return new ResponseEntity<>(builders, HttpStatus.OK);
    }

    @GetMapping("/conocidos")
    public ResponseEntity<List<UserDTO>> findConocidos(Principal principal) {
        List<UserDTO> conocidos = interactionUserService.getConocidos(principal.getName());

        return new ResponseEntity<>(conocidos, HttpStatus.OK);
    }

}
