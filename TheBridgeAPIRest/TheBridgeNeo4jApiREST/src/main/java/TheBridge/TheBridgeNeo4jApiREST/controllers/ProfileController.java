package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserProfileDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectTeamCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.services.InteractionUserService;
import TheBridge.TheBridgeNeo4jApiREST.services.ProjectService;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final UserService userService;
    private final InteractionUserService interactionUserService;
    private final ProjectService projectService;

    public ProfileController(UserService userService, InteractionUserService interactionUserService, ProjectService projectService) {
        this.userService = userService;
        this.interactionUserService = interactionUserService;
        this.projectService = projectService;
    }

    @GetMapping("/")
    public ResponseEntity<UserProfileDTO> getProfile(@RequestParam String username) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();

        User usuario = userService.getUserByUsername(username);

        userProfileDTO.setName(usuario.getName());
        userProfileDTO.setUsername(usuario.getUsername());
        userProfileDTO.setLegajo(usuario.getLegajo());
        userProfileDTO.setIntroduction(usuario.getIntroduction());
        userProfileDTO.setContactLinks(usuario.getContactLinks());
        userProfileDTO.setHasAccount(usuario.isEnabled());

        userProfileDTO.setSkills(interactionUserService.getSkillsByUsername(username));

        userProfileDTO.setComments(interactionUserService.getComentariosVisiblesByUser(username));

        userProfileDTO.setProjects(projectService.getProjectWithTeamAndCourseByUser(username)
                .stream().map(ProjectTeamCourseQueryResult::toProjectDTO).collect(Collectors.toList()));

        userProfileDTO.setBuilders(interactionUserService.getBuilders(username));

        return new ResponseEntity<>(userProfileDTO, HttpStatus.OK);
    }

    @PatchMapping("/modifyIntroduction")
    public ResponseEntity<UserDTO> modifyUserIntroduction(Principal principal, @RequestParam String introduction) {
        User user = userService.modifyUserIntroduction(principal.getName(), introduction);

        UserDTO responseUser = new UserDTO(user.getName(),user.getUsername(),user.getRoles());

        return new ResponseEntity<>(responseUser, HttpStatus.OK);
    }

    @PatchMapping("/modificarLinksContacto")
    public ResponseEntity<UserDTO> agregarLinkContacto(Principal principal, @RequestBody List<String> links) {
        User user = userService.setContactLinks(principal.getName(), links);

        UserDTO responseUser = new UserDTO(user.getName(),user.getUsername(),user.getRoles());

        return new ResponseEntity<>(responseUser, HttpStatus.OK);
    }
}
