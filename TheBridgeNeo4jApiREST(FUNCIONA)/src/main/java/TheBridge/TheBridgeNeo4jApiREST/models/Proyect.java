package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;
import java.util.UUID;

@Node
public class Proyect {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String titulo;
    private String descripcion;
    private List<String> links;
    private List<String> fotos;
    @Relationship(type = "REALIZADO_EN_EQUIPO_CON", direction = Relationship.Direction.OUTGOING)
    private Team equipo;
    @Relationship(type = "EN_CURSO", direction = Relationship.Direction.OUTGOING)
    private Course curso;

    public Proyect() {
    }

    public Proyect(String titulo, String descripcion, Team equipo, Course curso) {
        this.equipo = equipo;
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
    }

    public UUID getId() {
        return id;
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

    public Team getEquipo() {
        return this.equipo;
    }

    public List<String> getFotos() {
        return fotos;
    }

    public void setFotos(List<String> fotos) {
        this.fotos = fotos;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public Course getCurso() {
        return curso;
    }

    public void setCurso(Course curso) {
        this.curso = curso;
    }

}
