package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
public class Curso {
    @Id @GeneratedValue
    private Long id;
    private String identificador;
    @Relationship(type = "DE_MATERIA", direction = Relationship.Direction.OUTGOING)
    private Materia materia;
    @Relationship(type = "A_CARGO_DE", direction = Relationship.Direction.INCOMING)
    private Profesor profesor;
    @Relationship(type = "ESTUDIA_EN", direction = Relationship.Direction.INCOMING)
    private List<User> estudiantes;

    public Curso() {
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Materia getMateria() {
        return materia;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
    }

    public List<User> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<User> estudiantes) {
        this.estudiantes = estudiantes;
    }
}
