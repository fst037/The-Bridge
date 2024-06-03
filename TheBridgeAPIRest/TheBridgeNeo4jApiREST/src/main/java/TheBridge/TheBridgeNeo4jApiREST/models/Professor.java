package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;
import java.util.UUID;

@Node
public class Professor {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String nombre;
    private String legajo;
    private String email;
    private String contraseña;

    public Professor(String nombre, String legajo, String email) {
        this.setNombre(nombre);
        this.setEmail(email);
        this.setLegajo(legajo);
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return contraseña;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setEmail(String usuario) {
        this.email = usuario;
    }

    private void setLegajo(String legajo) {
        this.legajo  = legajo;
    }

    public void setPassword(String password) {
        this.contraseña = password;
    }
}
