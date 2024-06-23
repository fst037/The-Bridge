package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.HashMap;
import java.util.List;

public class TeamSkillsDTO {
    private List<UserDTO> members;
    private Float compatibility;
    private HashMap<String, Float> skills;

    public TeamSkillsDTO(List<UserDTO> members, Float compatibility, HashMap<String, Float> skills) {
        this.members = members;
        this.compatibility = compatibility;
        this.skills = skills;
    }

    public List<UserDTO> getMembers() {
        return members;
    }

    public void setMembers(List<UserDTO> members) {
        this.members = members;
    }

    public Float getCompatibility() {
        return compatibility;
    }

    public void setCompatibility(Float compatibility) {
        this.compatibility = compatibility;
    }

    public HashMap<String, Float> getSkills() {
        return skills;
    }

    public void setSkills(HashMap<String, Float> skills) {
        this.skills = skills;
    }
}
