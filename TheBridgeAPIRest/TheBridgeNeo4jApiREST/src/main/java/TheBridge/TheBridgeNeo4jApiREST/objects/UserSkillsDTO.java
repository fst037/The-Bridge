package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.HashMap;

public class UserSkillsDTO {

    private String name;
    private String username;
    private String legajo;
    private HashMap<String, Float> skills;

    public UserSkillsDTO(UserDTO userDTO, HashMap<String, Float> skills) {
        this.name = name;
        this.username = username;
        this.legajo = legajo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
}
