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
    private String nombre;
    @Relationship(type = "DE_MATERIA", direction = Relationship.Direction.OUTGOING)
    private Materia materia;
    @Relationship(type = "A_CARGO_DE", direction = Relationship.Direction.INCOMING)
    private Profesor profesor;
    @Relationship(type = "ESTUDIA_EN", direction = Relationship.Direction.INCOMING)
    private List<Estudiante> estudiantes;

    public Curso() {
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public List<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<Estudiante> estudiantes) {
        this.estudiantes = estudiantes;
    }
}
