package TheBridge.TheBridgeNeo4jApiREST.requests;

import java.util.List;

public class CreateProyectRequest {

    private String titulo;
    private String descripcion;
    private List<String> links;
    private String portadaBase64;
    private String equipoIdentifier;
    private String cursoIdentifier;

    public CreateProyectRequest() {
    }

    public CreateProyectRequest(String titulo, String descripcion, List<String> links, String portadaBase64, String equipoIdentifier, String cursoIdentifier) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.links = links;
        this.portadaBase64 = portadaBase64;
        this.equipoIdentifier = equipoIdentifier;
        this.cursoIdentifier = cursoIdentifier;
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

    public String getEquipoIdentifier() {
        return equipoIdentifier;
    }

    public void setEquipoIdentifier(String equipoIdentifier) {
        this.equipoIdentifier = equipoIdentifier;
    }

    public String getCursoIdentifier() {
        return cursoIdentifier;
    }

    public void setCursoIdentifier(String cursoIdentifier) {
        this.cursoIdentifier = cursoIdentifier;
    }
}
