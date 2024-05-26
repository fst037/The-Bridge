package dev.farhan.springneo4j.models;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Valoracion {
    @Id @GeneratedValue
    private Long id;

    @Property
    private String aptitud1;
    @Property
    private String aptitud2;
    @Property
    private String aptitud3;
    @Property
    private String mensaje;

    @TargetNode
    private User estudiante;

    public Valoracion() {
    }

    public Valoracion(String aptitud1, String aptitud2, String aptitud3, User estudiante, String mensaje) {
        this.aptitud1 = aptitud1;
        this.aptitud2 = aptitud2;
        this.aptitud3 = aptitud3;
        this.estudiante = estudiante;
        this.mensaje = mensaje;
    }

    public String getAptitud1() {
        return aptitud1;
    }

    public String getAptitud2() {
        return aptitud2;
    }

    public String getAptitud3() {
        return aptitud3;
    }

    public User getEstudiante() {
        return estudiante;
    }

    public String getMensaje() {
        return mensaje;
    }
}
