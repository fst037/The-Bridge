package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.CategoriasValoracion;
import TheBridge.TheBridgeNeo4jApiREST.models.Comment;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;
import TheBridge.TheBridgeNeo4jApiREST.objects.*;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CommonBuilderQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.UserSkillsQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InteractionUserService {

    private final UserRepository userRepository;

    public InteractionUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void realizarComentario(String principalName, Comment comentario) {
        userRepository.comentarPerfilCompañero(
                principalName,
                comentario.getDestinatario().getUsername(),
                comentario.getMensaje(),
                LocalDateTime.now().toString());
    }

    public void realizarValoracion(String principalName, Valoracion valoracion) {
        userRepository.valorarPerfilCompañero(
                principalName,
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
        String queryResult = userRepository.getSkillsByUsername(username);
        List<String> skills = Arrays.stream(queryResult.split(",")).toList();
        HashMap<String, Float> skillsMap = new HashMap<>();

        if (queryResult.isEmpty()) {
            List<String> skillNames = Arrays.stream(CategoriasValoracion.values()).map(CategoriasValoracion::name).toList();

            for (String skill : skillNames) {
                skillsMap.put(skill, 0.6f/ skillNames.size());
            }

            return skillsMap;
        }

        skillsMap.putAll(Arrays.stream(CategoriasValoracion.values()).map(CategoriasValoracion::name).collect(Collectors.toMap(String::toString, value -> 0f)));

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

    public List<UserSkillsDTO> getAvailableUsersSkillsByCourse(String courseCode) {

        List<UserSkillsQueryResult> userSkills = userRepository.getAvailableUsersSkillsByCourse(courseCode);

        List<UserSkillsDTO> userSkillsDTOList = new ArrayList<UserSkillsDTO>();

        for (UserSkillsQueryResult userSkill : userSkills) {

            UserSkillsDTO userSkillsDTO = new UserSkillsDTO(
                    new UserDTO(userSkill.getName(), userSkill.getUsername(), userSkill.getLegajo()),
                    userSkill.calculateProportionalSkills());

            userSkillsDTOList.add(userSkillsDTO);
        }

        return userSkillsDTOList;
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

    public boolean enviarSolicitudBuilder(String emailRemitente, String emailDestinatario) {
        return Boolean.TRUE.equals(userRepository.enviarSolicitudBuilder(emailRemitente, emailDestinatario));
    }

    public void aceptarSolicitudBuilder(String emailRemitente, String emailDestinatario) {
        userRepository.aceptarSolicitudBuilder(emailRemitente, emailDestinatario);
    }

    public void eliminarBuilder(String emailRemitente, String emailDestinatario) {
        userRepository.eliminarBuilder(emailRemitente, emailDestinatario);
    }

    public List<UserDTO> getSolicitudesRecibidasBuilder(String emailDestinatario) {
        return userRepository.findSolicitudesRecibidasBuilder(emailDestinatario).stream().map(User::toUserDTO).toList();
    }

    public List<UserDTO> getBuilders(String email) {
        return userRepository.findBuilders(email).stream().map(User::toUserDTO).toList();
    }

    public List<CommonBuilderQueryResult> getCommonBuilders(String email) {
        return userRepository.findCommonBuilders(email);
    }

    public Boolean checkRealizoEncuesta(String name) {
        return userRepository.checkRealizoEncuesta(name);
    }

    public List<UserDTO> getConocidos(String username) {
        return userRepository.getConocidos(username).stream().map(User::toUserDTO).toList();
    }
}
