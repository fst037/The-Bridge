package TheBridge.TheBridgeNeo4jApiREST.requests;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamSkillsDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;

public class SendMailTeamCreateRequest {

    private TeamSkillsDTO teamMembers;
    private String messageText;
    private Course course;
    private UserDTO sender;

    public SendMailTeamCreateRequest() {
    }

    public TeamSkillsDTO getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(TeamSkillsDTO teamMembers) {
        this.teamMembers = teamMembers;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }
}
