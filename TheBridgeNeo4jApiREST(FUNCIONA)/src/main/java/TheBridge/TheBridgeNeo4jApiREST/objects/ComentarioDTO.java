package TheBridge.TheBridgeNeo4jApiREST.objects;

public class ComentarioDTO {
    private String mensaje;
    private String destinatario;

    public ComentarioDTO(String mensaje, String destinatario) {
        this.mensaje = mensaje;
        this.destinatario = destinatario;
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
}
