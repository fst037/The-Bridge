package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Subject;

import java.util.List;

public class CourseDTO {

    private String name;
    private String code;
    private List<UserDTO> users;

    public CourseDTO(String name, String code, List<UserDTO> users) {
        this.name = name;
        this.code = code;
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }
}
