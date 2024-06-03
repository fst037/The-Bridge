package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

import java.util.List;
import java.util.UUID;

@Node
public class Project {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID identifier;
    private String titulo;
    private String descripcion;
    private String portadaBase64;
    private List<String> links;

    public Project() {
    }

    public Project(String titulo, String descripcion) {
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {return this.descripcion;}

    public String getTitulo() {
        return this.titulo;
    }

    public String getPortadaBase64() {
        return portadaBase64;
    }

    public void setPortadaBase64(String portadaBase64) {
        this.portadaBase64 = portadaBase64;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public UUID getIdentifier() {
        return identifier;
    }

}
