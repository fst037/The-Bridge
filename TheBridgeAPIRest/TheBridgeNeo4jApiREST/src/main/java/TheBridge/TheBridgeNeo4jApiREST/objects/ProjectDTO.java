package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;

import java.util.List;
import java.util.UUID;

public class ProjectDTO {

    private UUID identifier;
    private String titulo;
    private String descripcion;
    private List<String> links;
    private String portadaLink;
    private Team equipo;
    private List<UserDTO> members;
    private Course curso;

    public ProjectDTO() {
    }

    public ProjectDTO(UUID identifier, String titulo, String descripcion) {
        this.identifier = identifier;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public ProjectDTO(UUID identifier, String titulo, String descripcion, List<String> links, String portadaLink, Team equipo, Course curso, List<UserDTO> members) {
        this.identifier = identifier;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.links = links;
        this.portadaLink = portadaLink;
        this.equipo = equipo;
        this.curso = curso;
        this.members = members;
    }

    public UUID getIdentifier() {
        return identifier;
    }

    public void setIdentifier(UUID identifier) {
        this.identifier = identifier;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public String getPortadaLink() {
        return portadaLink;
    }

    public void setPortadaLink(String portadaLink) {
        this.portadaLink = portadaLink;
    }

    public Team getEquipo() {
        return equipo;
    }

    public void setEquipo(Team equipo) {
        this.equipo = equipo;
    }

    public Course getCurso() {
        return curso;
    }

    public void setCurso(Course curso) {
        this.curso = curso;
    }

    public List<UserDTO> getMembers() {
        return members;
    }

    public void setMembers(List<UserDTO> members) {
        this.members = members;
    }
}
