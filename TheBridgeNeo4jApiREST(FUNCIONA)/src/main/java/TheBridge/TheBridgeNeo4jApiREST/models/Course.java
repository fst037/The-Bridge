package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;
import java.util.UUID;

@Node
public class Course {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String identificador;
    @Relationship(type = "DE_MATERIA", direction = Relationship.Direction.OUTGOING)
    private Subject materia;
    @Relationship(type = "A_CARGO_DE", direction = Relationship.Direction.INCOMING)
    private Professor profesor;
    @Relationship(type = "ESTUDIA_EN", direction = Relationship.Direction.INCOMING)
    private List<User> estudiantes;

    public Course() {
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public Professor getProfesor() {
        return profesor;
    }

    public void setProfesor(Professor profesor) {
        this.profesor = profesor;
    }

    public Subject getMateria() {
        return materia;
    }

    public void setMateria(Subject materia) {
        this.materia = materia;
    }

    public List<User> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<User> estudiantes) {
        this.estudiantes = estudiantes;
    }

    public void addEstudiante(User estudiante) {
        this.estudiantes.add(estudiante);
    }
}
