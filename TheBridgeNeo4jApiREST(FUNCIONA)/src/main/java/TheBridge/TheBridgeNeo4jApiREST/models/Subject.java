package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.UUID;

@Node
public class Subject {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String name;
    private String codigo;

    public Subject() {
    }

    public Subject(String nombre, String codigo) {
        this.name = nombre;
        this.codigo = codigo;
    }

    public String getName() {
        return name;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setName(String nombre) {
        this.name = nombre;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
