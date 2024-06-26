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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<CommentDTO> addCommentarioAEstudiante(Principal principal, @RequestBody AddComentarioRequest comentarioRequest) {
        User remitente = userService.getUserByUsername(principal.getName());
        User destinatario = userService.getUserByUsername(comentarioRequest.getDestinatario());
        Comment comentario = new Comment(
                comentarioRequest.getMensaje(),
                destinatario
        );

        //TODO: Add validation to check if the comment is not toxic
        interactionUserService.realizarComentario(remitente, comentario);

        CommentDTO responseComment = new CommentDTO(comentario.getMensaje(), principal.getName(), comentario.getDestinatario().getUsername(), comentario.getTimestamp());

        return new ResponseEntity<>(responseComment, HttpStatus.CREATED);
    }

    @PostMapping("/valorarPerfil")
    public ResponseEntity<ValoracionDTO> addValoracionAEstudiante(Principal principal, @RequestBody AddValoracionRequest valoracionRequest) {
        User remitente = userService.getUserByUsername(principal.getName());
        User destinatario = userService.getUserByUsername(valoracionRequest.getDestinatario());

        Valoracion valoracion = new Valoracion(
                valoracionRequest.getVotos(),
                destinatario,
                valoracionRequest.getMensaje()
        );

        if (!valoracion.isValid()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        interactionUserService.realizarValoracion(remitente, valoracion);

        ValoracionDTO responseValoracion = new ValoracionDTO(valoracion);

        return new ResponseEntity<>(responseValoracion, HttpStatus.CREATED);
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
    public ResponseEntity<String> aceptarSolicitudBuilder(Principal principal, @RequestParam String remitente) {
        boolean sinErrores = interactionUserService.aceptarSolicitudBuilder(remitente, principal.getName());

        if (!sinErrores) {
            return new ResponseEntity<>("No se pudo aceptar la solicitud de " + remitente + ".", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Se acepto la solicitud de " + remitente + " correctamente.",HttpStatus.OK);
    }

    @DeleteMapping("/eliminarBuilder")
    public ResponseEntity<String> eliminarBuilder(Principal principal, @RequestParam String builderEliminado) {
        boolean sinErrores = interactionUserService.eliminarBuilder(principal.getName(), builderEliminado);

        if (!sinErrores) {
            return new ResponseEntity<>("No se pudo eliminar al builder " + builderEliminado + ".", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Se elimino el builder " + builderEliminado + " correctamente.",HttpStatus.OK);
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

}
