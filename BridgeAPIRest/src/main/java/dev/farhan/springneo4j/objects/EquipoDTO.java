package dev.farhan.springneo4j.objects;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.Equipo;
import dev.farhan.springneo4j.models.Estudiante;
import dev.farhan.springneo4j.models.Proyecto;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;

public class EquipoDTO {

    private long id;

    private ArrayList<Estudiante> estudiantes = new ArrayList<Estudiante>();

    private Proyecto proyecto;

    private Curso curso;

    public EquipoDTO(long id, Proyecto proyecto, ArrayList<Estudiante> estudiantes) {
        this.id = id;
        this.proyecto = proyecto;
        this.estudiantes = estudiantes;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public ArrayList<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(ArrayList<Estudiante> estudiantes) {
        this.estudiantes = estudiantes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
