package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;

@Node
public class Proyecto {

    @Id@GeneratedValue
    private long id;
    private String titulo;
    private String descripcion;
    private ArrayList<String> links;
    private String fotos;
    @Relationship(type = "REALIZADO_EN_EQUIPO_CON", direction = Relationship.Direction.OUTGOING)
    private Equipo equipo;


    public Proyecto(long id, String titulo, String descripcion, Equipo equipo) {
        this.id = id;
        this.equipo = equipo;
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

    public Equipo getEquipo() {
        return this.equipo;
    }

    public String getFotos() {
        return fotos;
    }

    public void setFotos(String fotos) {
        this.fotos = fotos;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
