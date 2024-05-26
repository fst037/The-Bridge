package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Comentario;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class InteractionUserService {

    private final UserRepository userRepository;

    public InteractionUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void realizarComentario(User estudiante, Comentario comentario) {
        estudiante.comentarPerfilCompañero(comentario);
        userRepository.save(estudiante);
    }

    public void realizarValoracion(User estudiante, Valoracion valoracion) {
        estudiante.valorarPerfilCompañero(valoracion);
        userRepository.save(estudiante);
    }
}
