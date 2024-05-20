package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;

@Node
public class Proyecto {

    String titulo;
    String descripción;
    ArrayList<String> links;
    String fotos;
    @Relationship(type = "REALIZADO_EN_EQUIPO_CON", direction = Relationship.Direction.OUTGOING)
    Equipo equipo;


    public Proyecto(String titulo, String descripcion, Equipo equipo) {
        this.equipo = equipo;
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
    }

    public void setDescripcion(String descripcion) {
        this.descripción = descripcion;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripción() {return this.descripción;}

    public String getTitulo() {
        return this.titulo;
    }

    public Equipo getEquipo() {
        return this.equipo;
    }
}
