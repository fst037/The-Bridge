package dev.farhan.springneo4j.objects;
import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.User;
import dev.farhan.springneo4j.models.Proyecto;
import java.util.ArrayList;
import java.util.List;


public class EquipoDTO {

    private long id;
    private List<User> estudiantes = new ArrayList<User>();
    private Curso curso;


    public EquipoDTO(List<User> estudiantes, Curso curso) {
        setId(id);
        this.curso = curso;
        this.estudiantes = estudiantes;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public List<User> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<User> estudiantes) {
        this.estudiantes = estudiantes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
