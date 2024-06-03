package TheBridge.TheBridgeNeo4jApiREST.requests;

import java.util.List;

public class AddUsersToCourseRequest {

    private String courseCode;
    private List<String> usernames;

    public AddUsersToCourseRequest(String courseCode, List<String> usernames) {
        this.courseCode = courseCode;
        this.usernames = usernames;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public List<String> getUsernames() {
        return usernames;
    }

    public void setUsernames(List<String> usernames) {
        this.usernames = usernames;
    }
}
