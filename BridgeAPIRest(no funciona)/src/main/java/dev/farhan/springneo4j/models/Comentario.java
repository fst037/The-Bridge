package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Comentario {
    @Id @GeneratedValue
    private Long id;

    @Property
    private String mensaje;

    @TargetNode
    private User estudiante;

    public Comentario(String mensaje, User estudiante) {
        this.mensaje = mensaje;
        this.estudiante = estudiante;
    }

    public Long getId() {
        return id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public User getEstudiante() {
        return estudiante;
    }
}