package dev.farhan.springneo4j.models;

import java.util.*;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
public class Equipo {

    @Id @GeneratedValue
    private long id;
    @Relationship(type = "FORMA_PARTE_DE", direction = Relationship.Direction.INCOMING)
    private ArrayList<User> estudiantes = new ArrayList<User>();
    @Relationship(type = "REALIZADO_EN_EQUIPO_CON", direction = Relationship.Direction.INCOMING)
    private Proyecto proyecto;
    @Relationship(type = "EN_CURSO", direction = Relationship.Direction.OUTGOING)
    private Curso curso;


    public Equipo(Curso curso) {
        this.setId(id);
        this.curso = curso;
    };

    public Equipo(ArrayList<User> estudiantes, Curso curso) {
        this.setId(id);
        this.curso = curso;
        this.estudiantes = estudiantes;
    };

    public ArrayList<User> getEstudiantes() {
        return this.estudiantes;
    };

    public void addEstudiante(User estudiante) {
        this.estudiantes.add(estudiante);
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}
