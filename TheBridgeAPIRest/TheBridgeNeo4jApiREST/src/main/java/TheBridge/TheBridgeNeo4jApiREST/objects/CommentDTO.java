package TheBridge.TheBridgeNeo4jApiREST.objects;

public class CommentDTO {
    private String mensaje;
    private String remitente;
    private String destinatario;
    private String timestamp;
    private boolean visible;

    public CommentDTO(String mensaje, String remitente, String destinatario, String timestamp, boolean visible) {
        this.mensaje = mensaje;
        this.remitente = remitente;
        this.destinatario = destinatario;
        this.timestamp = timestamp;
        this.visible = visible;
    }

    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    public String getDestinatario() {
        return destinatario;
    }
    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String getRemitente() {
        return remitente;
    }
    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }
    public boolean isVisible() {
        return visible;
    }
}
