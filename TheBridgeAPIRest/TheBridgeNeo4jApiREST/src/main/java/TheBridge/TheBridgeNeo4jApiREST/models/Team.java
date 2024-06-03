package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Node
public class Team {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID identifier;
    @Property
    private String nombre;

    public Team(String nombre) {
        this.nombre = nombre;
    };

    public Team() {
    }

    public UUID getIdentifier() {
        return identifier;
    }

    public void setIdentifier(UUID identifier) {
        this.identifier = identifier;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
