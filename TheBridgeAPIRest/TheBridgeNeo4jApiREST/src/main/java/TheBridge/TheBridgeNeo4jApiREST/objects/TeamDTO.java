package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;

import java.util.List;

public class TeamDTO {
    private Team team;
    private List<UserDTO> estudiantes;

    public TeamDTO() {
    }

    public TeamDTO(Team team, List<UserDTO> estudiantes) {
        this.team = team;
        this.estudiantes = estudiantes;

    }

    public Team getTeam() {
        return team;
    }

    public List<UserDTO> getEstudiantes() {
        return estudiantes;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setEstudiantes(List<UserDTO> estudiantes) {
        this.estudiantes = estudiantes;
    }
}
