package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.HashMap;
import java.util.List;

public class UserProfileDTO {

    private String name;
    private String username;
    private String legajo;
    private String introduction;
    private HashMap<String, Float> skills;
    private List<CommentDTO> comments;
    private List<ProjectDTO> projects;

    public UserProfileDTO() {
    }

    public UserProfileDTO(String name, String username, String legajo, String introduction, HashMap<String, Float> skills, List<CommentDTO> comments, List<ProjectDTO> projects) {
        this.name = name;
        this.username = username;
        this.legajo = legajo;
        this.introduction = introduction;
        this.skills = skills;
        this.comments = comments;
        this.projects = projects;
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

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public HashMap<String, Float> getSkills() {
        return skills;
    }

    public void setSkills(HashMap<String, Float> skills) {
        this.skills = skills;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public List<ProjectDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDTO> projects) {
        this.projects = projects;
    }
}
