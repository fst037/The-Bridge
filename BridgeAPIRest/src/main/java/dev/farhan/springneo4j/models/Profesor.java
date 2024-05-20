package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;

@Node
public class Profesor {

    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private String legajo;
    private String usuario;
    private String contraseña;
    @Relationship(type = "A_CARGO_DE", direction = Relationship.Direction.OUTGOING)
    private ArrayList<Curso> cursos;


    public Profesor(String nombre, String legajo, String usuario, String contraseña) {
        this.setNombre(nombre);
        this.setUsuario(usuario);
        this.setPassword(contraseña);
        this.setLegajo(legajo);
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getPassword() {
        return contraseña;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    private void setLegajo(String legajo) {
        this.legajo  = legajo;
    }

    public void setPassword(String password) {
        this.contraseña = password;
    }

    }
