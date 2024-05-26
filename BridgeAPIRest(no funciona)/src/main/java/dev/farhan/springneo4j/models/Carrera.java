package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
public class Carrera {
    private String nombre;
    private String codigo;
    private String facultad;
    @Relationship(type = "DE_CARRERA", direction = Relationship.Direction.INCOMING)
    private List<Materia> materias;

    public Carrera() {
    }

    public Carrera(String nombre, String codigo, String facultad) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.facultad = facultad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getFacultad() {
        return facultad;
    }

    public List<Materia> getMaterias() {
        return materias;
    }

    public void setMaterias(List<Materia> materias) {
        this.materias = materias;
    }
}
