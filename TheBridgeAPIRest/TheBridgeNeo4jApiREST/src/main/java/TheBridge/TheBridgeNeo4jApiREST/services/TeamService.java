package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.TeamUsersQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeamByIdentifier(String identifier) {
        return teamRepository.findTeamByIdentifier(identifier);
    }

    public TeamUsersQueryResult getTeamWithUsersByIdentifier(String identifier) {
        return teamRepository.findTeamWithUsersByIdentifier(identifier);
    }

    public List<Team> getTeamsByStudent(String username) {
        return teamRepository.findTeamsByStudent(username);
    }

    public TeamDTO createTeam(String username, String nombreEquipo) {

        Team equipo = new Team(nombreEquipo);

        teamRepository.save(equipo);

        UserDTO dueño = teamRepository.addFirstStudentToTeam(username, equipo.getIdentifier().toString());

        List<UserDTO> members = new ArrayList<>();
        members.add(dueño);

        TeamDTO equipoDTO = new TeamDTO(equipo, members);

        System.out.println("equipoDTO creado");

        return equipoDTO;
    }

    public TeamDTO addStudentToTeam(String propietario, String username, String identifier) {

        teamRepository.addStudentToTeam(propietario, username, identifier);

        TeamUsersQueryResult result = teamRepository.findTeamWithUsersByIdentifier(identifier);

        return result.toTeamDTO();
    }

    public TeamDTO removeStudentFromTeam(String propietario, String username, String identifier) {
        teamRepository.removeStudentFromTeam(propietario, username, identifier);

        TeamUsersQueryResult result = teamRepository.findTeamWithUsersByIdentifier(identifier);

        return result.toTeamDTO();
    }
}
