package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
public class Materia {
    private String nombre;
    private String codigo;
    @Relationship(type = "DE_CARRERA", direction = Relationship.Direction.OUTGOING)
    private List<Carrera> carreras;

    public Materia() {
    }

    public Materia(String nombre, String codigo) {
        this.nombre = nombre;
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
