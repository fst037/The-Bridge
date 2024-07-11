package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;

import java.util.HashMap;
import java.util.List;

public class TeamProfileDTO {

    private TeamDTO equipo;
    private HashMap<String, Float> skills;
    private List<Project> projects;

    public TeamProfileDTO() {
    }

    public TeamProfileDTO(TeamDTO equipo, HashMap<String, Float> skills, List<Project> projects) {
        this.equipo = equipo;
        this.skills = skills;
        this.projects = projects;
    }

    public TeamDTO getEquipo() {
        return equipo;
    }

    public void setEquipo(TeamDTO equipo) {
        this.equipo = equipo;
    }

    public HashMap<String, Float> getSkills() {
        return skills;
    }

    public void setSkills(HashMap<String, Float> skills) {
        this.skills = skills;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
