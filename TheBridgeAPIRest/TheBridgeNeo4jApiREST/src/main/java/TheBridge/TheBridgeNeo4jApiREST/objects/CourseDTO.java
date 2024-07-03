package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Subject;

import java.util.List;

public class CourseDTO {

    private String name;
    private String code;
    private String shift;
    private String day;
    private String period;
    private List<UserDTO> users;

    public CourseDTO() {
    }

    public CourseDTO(String name, String code, String shift, String day, String period, List<UserDTO> users) {
        this.name = name;
        this.code = code;
        this.shift = shift;
        this.day = day;
        this.period = period;
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

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
}
