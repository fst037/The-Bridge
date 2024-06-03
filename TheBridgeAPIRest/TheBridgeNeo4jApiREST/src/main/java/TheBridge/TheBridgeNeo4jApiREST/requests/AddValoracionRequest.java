package TheBridge.TheBridgeNeo4jApiREST.requests;

import java.util.List;

public class AddValoracionRequest {
    private String destinatario;
    private List<String> votos;
    private String mensaje;

    public AddValoracionRequest(String destinatario, List<String> votos, String mensaje) {
        this.destinatario = destinatario;
        this.votos = votos;
        this.mensaje = mensaje;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public List<String> getVotos() {
        return votos;
    }

    public String getMensaje() {
        return mensaje;
    }


}
