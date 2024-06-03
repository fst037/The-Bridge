package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Comment {


    @RelationshipId
    private String id;

    @Property
    private String mensaje;

    @Property
    private String timestamp;

    @Property
    private boolean visible;

    @TargetNode
    private User destinatario;

    public Comment(String mensaje, User destinatario) {
        this.mensaje = mensaje;
        this.destinatario = destinatario;
        this.timestamp = java.time.LocalDateTime.now().toString();
        this.visible = true;
    }

    public String getMensaje() {
        return mensaje;
    }

    public User getDestinatario() {
        return destinatario;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }
}