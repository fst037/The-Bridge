package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;

import java.util.List;

public class TeamUsersQueryResult {

    private Team team;
    private List<User> users;

    public TeamUsersQueryResult(Team team, List<User> users) {
        this.team = team;
        this.users = users;
    }

    public Team getTeam() {
        return team;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public TeamDTO toTeamDTO() {
        return new TeamDTO(this.team, this.users.stream().map(User::toUserDTO).toList());
    }
}
