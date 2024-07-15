package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.*;
import TheBridge.TheBridgeNeo4jApiREST.objects.*;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectWithCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.TeamUsersQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.services.InteractionUserService;
import TheBridge.TheBridgeNeo4jApiREST.services.ProjectService;
import TheBridge.TheBridgeNeo4jApiREST.services.TeamService;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/equipos")
public class TeamController {

    private final TeamService equipoService;
    private final InteractionUserService interactionUserService;
    private final ProjectService projectService;

    public TeamController(TeamService equipoService, InteractionUserService interactionUserService, ProjectService projectService) {
        this.equipoService = equipoService;
        this.interactionUserService = interactionUserService;
        this.projectService = projectService;
    }

    @GetMapping("/porIdentifier")
    public ResponseEntity<TeamProfileDTO> equipoDetails(@RequestParam String identifier) {
        TeamUsersQueryResult result = equipoService.getTeamWithUsersByIdentifier(identifier);

        TeamProfileDTO responseEquipo = new TeamProfileDTO();

        responseEquipo.setEquipo(result.toTeamDTO());

        HashMap<String, Float> teamSkills = new HashMap<String, Float>();

        for (User user : result.getUsers()) {
            HashMap<String, Float> userSkills = interactionUserService.getSkillsByUsername(user.getUsername());

            for (Entry<String, Float> entry : userSkills.entrySet()) {
                String skill = entry.getKey();
                Float value = entry.getValue();
                if (teamSkills.containsKey(skill)) {
                    teamSkills.put(skill, teamSkills.get(skill) + value);
                } else {
                    teamSkills.put(skill, value);
                }
            }
        }

        responseEquipo.setSkills(teamSkills);

        List<ProjectDTO> proyectos = projectService.getProjectsByTeam(identifier).stream().map(ProjectWithCourseQueryResult::toProjectDTO).collect(Collectors.toList());

        responseEquipo.setProjects(proyectos);

        return new ResponseEntity<>(responseEquipo, HttpStatus.OK);
    }

    @GetMapping("/deUsuario")
    public ResponseEntity<List<TeamDTO>> getEquiposByUser(@RequestParam String username) {
        List<TeamDTO> equipos = equipoService.getTeamsByStudent(username);

        return new ResponseEntity<>(equipos, HttpStatus.OK);
    }

    @GetMapping("/misEquipos")
    public ResponseEntity<List<TeamDTO>> getMisEquipos(Principal principal) {
        List<TeamDTO> equipos = equipoService.getTeamsByStudent(principal.getName());

        return new ResponseEntity<>(equipos, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<TeamDTO> createEquipo(Principal principal, @RequestParam String nombreEquipo) {
        TeamDTO nuevoEquipo = equipoService.createTeam(principal.getName(), nombreEquipo);

        return new ResponseEntity<>(nuevoEquipo, HttpStatus.CREATED);
    }

    @PostMapping("/addStudent")
    public ResponseEntity<TeamDTO> addStudentToEquipo(Principal principal, @RequestParam String username, @RequestParam String identifier) {
        TeamDTO nuevoEquipo = equipoService.addStudentToTeam(principal.getName(), username, identifier);
        return new ResponseEntity<>(nuevoEquipo, HttpStatus.CREATED);
    }

    @DeleteMapping("/removeStudent")
    public ResponseEntity<TeamDTO> removeStudentFromEquipo(Principal principal, @RequestParam String username, @RequestParam String identifier) {
        TeamDTO nuevoEquipo = equipoService.removeStudentFromTeam(principal.getName(), username, identifier);
        return new ResponseEntity<>(nuevoEquipo, HttpStatus.OK);
    }

    @PatchMapping("/modificarNombre")
    public ResponseEntity<TeamDTO> updateTeamName(@RequestParam String teamId, @RequestParam String newName) {
        TeamDTO equipoModificado = equipoService.updateTeamName(teamId, newName);
        return new ResponseEntity<>(equipoModificado, HttpStatus.OK);
    }

    /*
    @GetMapping("/{identifier}/reccomendations")
    public ResponseEntity<List<UserSkillsDTO>> getEstudiantesRecomendaciones(@RequestParam String identifier) {
        String habilidadNecesaria = this.getHabilidadNecesaria(identifier);
        List<User> totalEstudiantes = userService.getAllUsers();
        Comparator<User> comparator = getComparatorByHabilidad(habilidadNecesaria.toLowerCase());
        PriorityQueue<User> userQueue = new PriorityQueue<>(comparator);
        userQueue.addAll(totalEstudiantes);
        List<UserSkillsDTO> sortedUsers = new ArrayList<>();
        while (!userQueue.isEmpty()) {
            User usuario = userQueue.poll();
            UserSkillsDTO userHabilitiesDTO = new UserSkillsDTO(usuario.getName(), usuario.getUsername(), usuario.getLegajo());
            userHabilitiesDTO.setLiderazgo(userHabilitiesDTO.getLiderazgo());
            userHabilitiesDTO.setOrganizacion(userHabilitiesDTO.getOrganizacion());
            userHabilitiesDTO.setIdeacion(userHabilitiesDTO.getIdeacion());
            userHabilitiesDTO.setDesarrollo(usuario.getDesarrollo());
            userHabilitiesDTO.setComunicación(usuario.getComunicación());
            sortedUsers.add(userHabilitiesDTO);
        }
        return new ResponseEntity<>(sortedUsers, HttpStatus.OK);
    }

    private String getHabilidadNecesaria(String identifier) {
        List<User> integrantes = equipoService.getTeamWithUsersByIdentifier(identifier).getUsers();
        HashMap<String, Integer> sumaHabilidades = getSumaHabilidades(integrantes);
        int cantIntegrantes = integrantes.size();
        HashMap<String, Double> mediaHabilidades = getMediaHabilidades(sumaHabilidades, cantIntegrantes);
        HashMap<String, Double> desviacionEstandarHabilidades = getDesviacionEstandarHabilidades(integrantes, mediaHabilidades);
        List<Entry<String, Double>> desviacionesOrdenadas = ordenarDesviaciones(desviacionEstandarHabilidades);
        return desviacionesOrdenadas.get(0).getKey();
    }

    private HashMap<String, Integer> getSumaHabilidades(List<User> estudiantes) {
        HashMap<String, Integer> habilidades =  new HashMap<>();
        habilidades.put("Liderazgo", 0);
        habilidades.put("Organizacion", 0);
        habilidades.put("Ideacion", 0);
        habilidades.put("Desarrollo", 0);
        habilidades.put("Comunicacion", 0);
        for (User user: estudiantes) {
            int liderazgoAnterior = habilidades.get("Liderazgo");
            int organizacionAnterior = habilidades.get("Organizacion");
            int ideacionAnterior = habilidades.get("Ideacion");
            int desarrolloAnterior = habilidades.get("Desarrollo");
            int comunicacionAnterior = habilidades.get("Comunicacion");

            habilidades.put("Liderazgo", liderazgoAnterior + user.getLiderazgo());
            habilidades.put("Organizacion", organizacionAnterior + user.getOrganizacion());
            habilidades.put("Ideacion", ideacionAnterior + user.getIdeacion());
            habilidades.put("Desarrollo", desarrolloAnterior + user.getDesarrollo());
            habilidades.put("Comunicacion", comunicacionAnterior + user.getComunicación());
        }
        return habilidades;
    }

    private HashMap<String, Double> getMediaHabilidades(HashMap<String, Integer> sumaHabilidades, int numEstudiantes) {
        HashMap<String, Double> mediaHabilidades = new HashMap<>();
        for (String habilidad : sumaHabilidades.keySet()) {
            mediaHabilidades.put(habilidad, sumaHabilidades.get(habilidad) / (double) numEstudiantes);
        }
        return mediaHabilidades;
    }

    private HashMap<String, Double> getDesviacionEstandarHabilidades(List<User> estudiantes, HashMap<String, Double> mediaHabilidades) {
        HashMap<String, Double> sumaDesviacion = new HashMap<>();
        HashMap<String, Double> desviacionEstandarHabilidades = new HashMap<>();
        // Inicializar sumaDesviacion con ceros
        for (String habilidad : mediaHabilidades.keySet()) {
            sumaDesviacion.put(habilidad, 0.0);
        }
        // Calcular la suma de los cuadrados de las diferencias de cada habilidad
        for (User user : estudiantes) {
            sumaDesviacion.put("Liderazgo", sumaDesviacion.get("Liderazgo") + Math.pow(user.getLiderazgo() - mediaHabilidades.get("Liderazgo"), 2));
            sumaDesviacion.put("Organizacion", sumaDesviacion.get("Organizacion") + Math.pow(user.getOrganizacion() - mediaHabilidades.get("Organizacion"), 2));
            sumaDesviacion.put("Ideacion", sumaDesviacion.get("Ideacion") + Math.pow(user.getIdeacion() - mediaHabilidades.get("Ideacion"), 2));
            sumaDesviacion.put("Desarrollo", sumaDesviacion.get("Desarrollo") + Math.pow(user.getDesarrollo() - mediaHabilidades.get("Desarrollo"), 2));
            sumaDesviacion.put("Comunicacion", sumaDesviacion.get("Comunicacion") + Math.pow(user.getComunicación() - mediaHabilidades.get("Comunicacion"), 2));
        }
        // Calcular la desviación estándar para cada habilidad
        int numEstudiantes = estudiantes.size();
        for (String habilidad : sumaDesviacion.keySet()) {
            desviacionEstandarHabilidades.put(habilidad, Math.sqrt(sumaDesviacion.get(habilidad) / numEstudiantes));
        }
        return desviacionEstandarHabilidades;
    }

    private List<Entry<String, Double>> ordenarDesviaciones(HashMap<String, Double> desviacionEstandarHabilidades) {
        List<Entry<String, Double>> listaDesviaciones = new ArrayList<>(desviacionEstandarHabilidades.entrySet());
        listaDesviaciones.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));
        return listaDesviaciones;
    }

    private double calcularHabilidadEstudiante(User user, String habilidadNecesaria) {
        double liderazgo = user.getLiderazgo();
        double organizacion = user.getOrganizacion();
        double ideacion = user.getIdeacion();
        double desarrollo = user.getDesarrollo();
        double comunicacion = user.getComunicación();
        double habilidadTotal;
        switch (habilidadNecesaria) {
            case "Liderazgo":
                habilidadTotal = liderazgo;
                break;
            case "Organizacion":
                habilidadTotal = organizacion;
                break;
            case "Ideacion":
                habilidadTotal = ideacion;
                break;
            case "Desarrollo":
                habilidadTotal = desarrollo;
                break;
            case "Comunicacion":
                habilidadTotal = comunicacion;
                break;
            default:
                habilidadTotal = 0.0;
                break;
        }
        return habilidadTotal;
    }

    private Comparator<User> getComparatorByHabilidad(String habilidad) {
        switch (habilidad.toLowerCase()) {
            case "liderazgo":
                return Comparator.comparingInt(User::getLiderazgo).reversed();
            case "organizacion":
                return Comparator.comparingInt(User::getOrganizacion).reversed();
            case "ideacion":
                return Comparator.comparingInt(User::getIdeacion).reversed();
            case "desarrollo":
                return Comparator.comparingInt(User::getDesarrollo).reversed();
            case "comunicacion":
                return Comparator.comparingInt(User::getComunicación).reversed();
            default:
                throw new IllegalArgumentException("Habilidad desconocida: " + habilidad);
        }
    }*/
}
