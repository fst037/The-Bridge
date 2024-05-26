package TheBridge.TheBridgeNeo4jApiREST.requests;

import java.util.List;

public class CreateProyectRequest {

    private String titulo;
    private String descripcion;
    private List<String> links;
    private List<String> fotos;
    private String equipo;
    private String curso;

    public CreateProyectRequest() {
    }

    public CreateProyectRequest(String titulo, String descripcion, List<String> links, List<String> fotos, String equipo, String curso) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.links = links;
        this.fotos = fotos;
        this.equipo = equipo;
        this.curso = curso;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public List<String> getLinks() {
        return links;
    }

    public List<String> getFotos() {
        return fotos;
    }

    public String getEquipo() {
        return equipo;
    }

    public String getCurso() {
        return curso;
    }
}
