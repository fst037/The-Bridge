package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserSkillsDTO;
import TheBridge.TheBridgeNeo4jApiREST.services.CourseService;
import TheBridge.TheBridgeNeo4jApiREST.services.InteractionUserService;
import TheBridge.TheBridgeNeo4jApiREST.services.TeamService;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/pi/v1/sugerenciasEquipos")
public class TeamSuggestionController {

    private final TeamService teamService;
    private final InteractionUserService interactionUserService;
    private final CourseService courseService;

    public TeamSuggestionController(TeamService teamService, InteractionUserService interactionUserService, CourseService courseService) {
        this.teamService = teamService;
        this.interactionUserService = interactionUserService;
        this.courseService = courseService;
    }

    @GetMapping("/sugerirEquipos")
    public ResponseEntity<List<List<UserDTO>>> sugerirEquipos(Principal principal, @RequestParam String courseId, @RequestParam Integer cantIntegrantes) {
        List<UserDTO> students = courseService.getUsersOfCourse(courseId).getUsers();

        if (students.size() < cantIntegrantes) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }



        List<UserSkillsDTO> userSkillsDTOList = new ArrayList<UserSkillsDTO>();

        for (UserDTO student : students) {
            HashMap<String, Float> skills = interactionUserService.getSkillsByUsername(student.getUsername());
            userSkillsDTOList.add(new UserSkillsDTO(student, skills));
        }

        return null;
    }
 }
