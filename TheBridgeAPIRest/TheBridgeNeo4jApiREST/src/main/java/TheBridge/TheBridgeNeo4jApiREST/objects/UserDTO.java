package TheBridge.TheBridgeNeo4jApiREST.objects;

public class UserDTO {
    private String name;
    private String username;
    private String legajo;

    public UserDTO() {
    }

    public UserDTO(String name, String username, String legajo) {
        this.name = name;
        this.username = username;
        this.legajo = legajo;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
}
