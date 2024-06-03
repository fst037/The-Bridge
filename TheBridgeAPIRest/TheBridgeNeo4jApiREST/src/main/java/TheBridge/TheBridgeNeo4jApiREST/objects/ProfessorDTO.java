package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.UUID;

public class ProfessorDTO {

    private UUID id;
    private String nombre;
    private String legajo;
    private String email;
    private String contraseña;


    public ProfessorDTO(String nombre, String legajo, String email) {
        this.nombre = nombre;
        this.legajo = legajo;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
}

