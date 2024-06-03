package TheBridge.TheBridgeNeo4jApiREST.requests;

public class CreateUserRequest {
    private String name;
    private String username;
    private String legajo;
    private String password;
    private String roles;

    public CreateUserRequest(String name, String username, String legajo, String password, String roles) {
        this.name = name;
        this.username = username;
        this.legajo = legajo;
        this.password = password;
        this.roles = roles;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
