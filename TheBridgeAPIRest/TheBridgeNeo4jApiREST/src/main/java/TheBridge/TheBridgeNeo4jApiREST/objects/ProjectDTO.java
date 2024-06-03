package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ProjectDTO {

    private UUID identifier;
    private String titulo;
    private String descripcion;
    private List<String> links;
    private String portadaBase64;
    private Team equipo;
    private Course curso;

    public ProjectDTO() {
    }

    public ProjectDTO(UUID identifier, String titulo, String descripcion) {
        this.identifier = identifier;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public ProjectDTO(UUID identifier, String titulo, String descripcion, List<String> links, String portadaBase64, Team equipo, Course curso) {
        this.identifier = identifier;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.links = links;
        this.portadaBase64 = portadaBase64;
        this.equipo = equipo;
        this.curso = curso;
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

    public String getPortadaBase64() {
        return portadaBase64;
    }

    public void setPortadaBase64(String portadaBase64) {
        this.portadaBase64 = portadaBase64;
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
}
