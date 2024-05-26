package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Comentario;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.objects.ComentarioDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.ValoracionDTO;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddComentarioRequest;
import TheBridge.TheBridgeNeo4jApiREST.requests.AddValoracionRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.InteractionUserService;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

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
    public ResponseEntity<ComentarioDTO> addCommentarioAEstudiante(Principal principal, @RequestBody AddComentarioRequest comentarioRequest) {
        User remitente = userService.getUserByUsername(principal.getName());
        User destinatario = userService.getUserByUsername(comentarioRequest.getDestinatario());
        Comentario comentario = new Comentario(
                comentarioRequest.getMensaje(),
                destinatario
        );

        //TODO: Add validation to check if the comment is not toxic
        interactionUserService.realizarComentario(remitente, comentario);

        ComentarioDTO responseComment = new ComentarioDTO(comentario.getMensaje(), comentario.getEstudiante().getUsername());

        return new ResponseEntity<>(responseComment, HttpStatus.CREATED);
    }

    @PostMapping("/valorarPerfil")
    public ResponseEntity<ValoracionDTO> addValoracionAEstudiante(Principal principal, @RequestBody AddValoracionRequest valoracionRequest) {
        User remitente = userService.getUserByUsername(principal.getName());
        User destinatario = userService.getUserByUsername(valoracionRequest.getDestinatario());

        Valoracion valoracion = new Valoracion(
                valoracionRequest.getAptitud1(),
                valoracionRequest.getAptitud2(),
                valoracionRequest.getAptitud3(),
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
}
