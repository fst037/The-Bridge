package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.CategoriasValoracion;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamSkillsDTO;
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

import org.apache.commons.math3.util.CombinatoricsUtils;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/sugerenciasEquipos")
public class TeamSuggestionController {

    private final TeamService teamService;
    private final InteractionUserService interactionUserService;
    private final CourseService courseService;

    public TeamSuggestionController(TeamService teamService, InteractionUserService interactionUserService, CourseService courseService) {
        this.teamService = teamService;
        this.interactionUserService = interactionUserService;
        this.courseService = courseService;
    }

    private List<TeamSkillsDTO> calcularFormacionEquipos(List<UserSkillsDTO> userSkillsCursoEntero, List<UserSkillsDTO> userSkillsFijas, Integer cantIntegrantesFinal) {

        for (UserSkillsDTO userSkillsDTO: userSkillsFijas){
            userSkillsCursoEntero.remove(userSkillsDTO);
        }

        // Generar todas las posibles combinaciones de estudiantes en grupos de cantIntegrantes
        Iterator<int[]> iterator = CombinatoricsUtils.combinationsIterator(userSkillsCursoEntero.size(), cantIntegrantesFinal-userSkillsFijas.size());
        List<List<UserSkillsDTO>> combinations = new ArrayList<>();
        while (iterator.hasNext()) {
            int[] combinationIndices = iterator.next();
            List<UserSkillsDTO> combination = Arrays.stream(combinationIndices)
                    .mapToObj(userSkillsCursoEntero::get)
                    .collect(Collectors.toList());
            combination.addAll(userSkillsFijas);
            combinations.add(combination);
        }
        // Crear un mapa para almacenar cada combinación y su compatibilidad
        Map<List<UserSkillsDTO>, Float> compatibilityMap = new HashMap<>();

        // Para cada combinación, calcular la compatibilidad del equipo
        for (List<UserSkillsDTO> combination : combinations) {
            Float compatibility = UserSkillsDTO.getCompatibility(combination);
            compatibilityMap.put(combination, compatibility);
        }

        // Ordenar las combinaciones por su compatibilidad en orden descendente
        List<Map.Entry<List<UserSkillsDTO>, Float>> sortedCombinations = compatibilityMap.entrySet().stream()
                .sorted(Map.Entry.<List<UserSkillsDTO>, Float>comparingByValue().reversed())
                .toList();

        // Devolver las 10 mejores combinaciones
        List<List<UserSkillsDTO>> top24Combinations = sortedCombinations.stream()
                .limit(24)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        List<TeamSkillsDTO> teamSkillsDTOList = new ArrayList<TeamSkillsDTO>();

        for (List<UserSkillsDTO> combination : top24Combinations) {

            List<UserDTO> members = combination.stream()
                    .map(userSkillsDTO -> new UserDTO(userSkillsDTO.getName(), userSkillsDTO.getUsername(), userSkillsDTO.getLegajo()))
                    .collect(Collectors.toList());

            Float compatibility = compatibilityMap.get(combination);

            HashMap<String, Float> combinationSkills = new HashMap<String, Float>();

            combinationSkills.putAll(Arrays.stream(CategoriasValoracion.values()).map(CategoriasValoracion::name).collect(Collectors.toMap(String::toString, value -> 0f)));

            for (UserSkillsDTO userSkillsDTO : combination) {
                for (Map.Entry<String, Float> entry : userSkillsDTO.getSkills().entrySet()) {
                    combinationSkills.put(entry.getKey(), combinationSkills.getOrDefault(entry.getKey(), 0f) + entry.getValue());
                }
            }

            teamSkillsDTOList.add(new TeamSkillsDTO(members, compatibility, combinationSkills));
        }

        return teamSkillsDTOList;
    }

    @GetMapping("/sugerirEquipos")
    public ResponseEntity<?> sugerirEquipos(Principal principal, @RequestParam String courseCode, @RequestParam Integer cantIntegrantes) {
        List<UserDTO> students = courseService.getUsersOfCourse(courseCode).getUsers();

        if (students.stream().map(UserDTO::getUsername).noneMatch(principal.getName()::equals)) {
            return new ResponseEntity<>("El usuario no pertenece al curso", HttpStatus.FORBIDDEN);
        }

        if (students.size() < cantIntegrantes) {
            return new ResponseEntity<>("El número de estudiantes es menor que la cantidad de integrantes requerida", HttpStatus.BAD_REQUEST);
        }

        if (cantIntegrantes < 2 || cantIntegrantes > 6) {
            return new ResponseEntity<>("La cantidad de integrantes debe estar entre 2 y 4", HttpStatus.BAD_REQUEST);
        }

        List<UserSkillsDTO> userSkillsCursoEntero = interactionUserService.getAvailableUsersSkillsByCourse(courseCode);

        List<TeamSkillsDTO> teamSkillsDTOList = calcularFormacionEquipos(
                userSkillsCursoEntero,
                userSkillsCursoEntero.stream().filter(userSkillsDTO -> userSkillsDTO.getUsername().equals(principal.getName())).collect(Collectors.toList()),
                cantIntegrantes);

        return new ResponseEntity<>(teamSkillsDTOList,HttpStatus.OK);
    }

    @GetMapping("/completarEquipo")
    public ResponseEntity<?> completarEquipo(Principal principal, @RequestParam String teamId, @RequestParam String courseCode, @RequestParam Integer cantIntegrantesFinales) {
        List<UserDTO> students = courseService.getUsersOfCourse(courseCode).getUsers();

        List<UserDTO> miembrosEquipo = teamService.getTeamWithUsersByIdentifier(teamId).getUsers().stream().map(User::toUserDTO).collect(Collectors.toList());

        if (students.stream().map(UserDTO::getUsername).noneMatch(principal.getName()::equals)) {
            return new ResponseEntity<>("El usuario no pertenece al curso", HttpStatus.FORBIDDEN);
        }

        if (cantIntegrantesFinales - miembrosEquipo.size() < 1 || cantIntegrantesFinales - miembrosEquipo.size() > 6) {
            return new ResponseEntity<>("Se pueden agregar entre 1 y 6 miembros por vez", HttpStatus.BAD_REQUEST);
        }

        List<UserSkillsDTO> userSkillsCursoEntero = interactionUserService.getAvailableUsersSkillsByCourse(courseCode);

        List<TeamSkillsDTO> teamSkillsDTOList = calcularFormacionEquipos(
                userSkillsCursoEntero,
                userSkillsCursoEntero.stream().filter(userSkillsDTO -> miembrosEquipo.stream().map(UserDTO::getUsername).anyMatch(userSkillsDTO.getUsername()::equals)).collect(Collectors.toList()),
                cantIntegrantesFinales);

        return new ResponseEntity<>(teamSkillsDTOList,HttpStatus.OK);
    }

 }
