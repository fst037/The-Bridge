package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Comment;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.objects.CommentDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.ValoracionDTO;
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
}
