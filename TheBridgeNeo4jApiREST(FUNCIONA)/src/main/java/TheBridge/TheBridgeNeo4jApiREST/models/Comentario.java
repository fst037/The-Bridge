package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Comentario {

    @RelationshipId
    private String id;

    @Property
    private String mensaje;

    @TargetNode
    private User destinatario;

    public Comentario(String mensaje, User destinatario) {
        this.mensaje = mensaje;
        this.destinatario = destinatario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public User getEstudiante() {
        return destinatario;
    }
}