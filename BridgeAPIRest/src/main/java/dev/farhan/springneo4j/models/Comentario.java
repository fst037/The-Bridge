package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Comentario {
    @Id @GeneratedValue
    private Long id;

    @Property
    private String mensaje;

    @TargetNode
    private Estudiante estudiante;

    public Comentario(String mensaje, Estudiante estudiante) {
        this.mensaje = mensaje;
        this.estudiante = estudiante;
    }

    public Long getId() {
        return id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }
}