package dev.farhan.springneo4j.models;

import java.util.*;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
public class Equipo {
    @Relationship(type = "FORMA_PARTE_DE", direction = Relationship.Direction.INCOMING)
    private ArrayList<Estudiante> estudiantes = new ArrayList<Estudiante>();

    @Relationship(type = "REALIZADO_EN_EQUIPO_CON", direction = Relationship.Direction.INCOMING)
    private Proyecto proyecto;

    @Relationship(type = "EN_CURSO", direction = Relationship.Direction.OUTGOING)
    private Curso curso;

    public Equipo() {

    };

    public ArrayList<Estudiante> getEstudiantes() {
        return this.estudiantes;
    };

    public void addEstudiante(Estudiante estudiante) {
        this.estudiantes.add(estudiante);
    }
}
