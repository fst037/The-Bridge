package TheBridge.TheBridgeNeo4jApiREST.requests;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamSkillsDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;

public class SendMailTeamJoinRequest {

    private TeamSkillsDTO teamMembers;
    private String messageText;
    private Course course;
    private TeamDTO team;
    private UserDTO sender;

    public SendMailTeamJoinRequest() {
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

    public TeamDTO getTeam() {
        return team;
    }

    public void setTeam(TeamDTO team) {
        this.team = team;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }
}
