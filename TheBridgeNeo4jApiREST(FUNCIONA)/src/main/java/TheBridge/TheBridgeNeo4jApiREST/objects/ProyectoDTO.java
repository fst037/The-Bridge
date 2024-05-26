package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;

import java.util.ArrayList;
import java.util.UUID;

public class ProyectoDTO {

    private UUID id;
    private String titulo;
    private String descripcion;
    private ArrayList<String> links;
    private String fotos;
    private String equipo;
    private String curso;

    public ProyectoDTO() {
    }

    public ProyectoDTO(UUID id, String titulo, String descripcion, String equipo, String curso) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.equipo = equipo;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public ArrayList<String> getLinks() {
        return links;
    }

    public void setLinks(ArrayList<String> links) {
        this.links = links;
    }

    public String getFotos() {
        return fotos;
    }

    public void setFotos(String fotos) {
        this.fotos = fotos;
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }
}
