package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;
import java.util.UUID;

@Node
public class Career {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String nombre;
    private String codigo;
    private String facultad;
    @Relationship(type = "DE_CARRERA", direction = Relationship.Direction.INCOMING)
    private List<Subject> materias;

    public Career() {
    }

    public Career(String nombre, String codigo, String facultad) {
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

    public List<Subject> getMaterias() {
        return materias;
    }

    public void setMaterias(List<Subject> materias) {
        this.materias = materias;
    }
}
