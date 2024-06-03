package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Comment;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.objects.CommentDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.ValoracionDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.VotosDTO;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class InteractionUserService {

    private final UserRepository userRepository;

    public InteractionUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void realizarComentario(User principal, Comment comentario) {
        userRepository.comentarPerfilCompañero(
                principal.getUsername(),
                comentario.getDestinatario().getUsername(),
                comentario.getMensaje(),
                LocalDateTime.now().toString());
    }

    public void realizarValoracion(User principal, Valoracion valoracion) {
        userRepository.valorarPerfilCompañero(
                principal.getUsername(),
                valoracion.getDestinatario().getUsername(),
                valoracion.getVotos(),
                valoracion.getMensaje(),
                LocalDateTime.now().toString());
    }

    public List<CommentDTO> getComentariosByUser(String username) {
        return userRepository.getCommentsByUser(username);
    }

    public List<CommentDTO> getComentariosVisiblesByUser(String username) {
        return userRepository.getVisibleCommentsByUser(username);
    }

    public HashMap<String, Float> getSkillsByUsername(String username) {
        List<String> skills = Arrays.stream(userRepository.getSkillsByUsername(username).split(",")).toList();
        HashMap<String, Float> skillsMap = new HashMap<>();

        int totalSkills = 0;

        for (String skill : skills) {
            if (skillsMap.containsKey(skill)) {
                skillsMap.put(skill, skillsMap.get(skill) + 1);
            } else {
                skillsMap.put(skill, 1f);
            }
            totalSkills++;
        }

        for (String skill : skillsMap.keySet()) {
            skillsMap.put(skill, skillsMap.get(skill) / totalSkills);
        }

        return skillsMap;
    }

    public void ocultarComentario(Principal principal, String remitente, String timestamp) {
        userRepository.ocultarComentario(
                remitente,
                principal.getName(),
                timestamp);
    }

    public void mostrarComentario(Principal principal, String remitente, String timestamp) {
        userRepository.mostrarComentario(
                remitente,
                principal.getName(),
                timestamp);
    }
}
