package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository equipoReposiory;

    public TeamService(TeamRepository equipoReposiory) {
        this.equipoReposiory = equipoReposiory;
    }

    public List<Team> getAllTeams() {
        return equipoReposiory.findAll();
    }

    public Optional<Team> getTeamByIdentifier(String identifier) {
        return equipoReposiory.findTeamByIdentifier(identifier);
    }

    public List<Team> getTeamsByStudent(String username) {
        return equipoReposiory.findTeamsByStudent(username);
    }
}
