package TheBridge.TheBridgeNeo4jApiREST.requests;

public class AddValoracionRequest {
    private String destinatario;
    private String aptitud1;
    private String aptitud2;
    private String aptitud3;
    private String mensaje;

    public AddValoracionRequest(String destinatario, String aptitud1, String aptitud2, String aptitud3, String mensaje) {
        this.destinatario = destinatario;
        this.aptitud1 = aptitud1;
        this.aptitud2 = aptitud2;
        this.aptitud3 = aptitud3;
        this.mensaje = mensaje;
    }

    public String getDestinatario() {
        return destinatario;
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

    public String getMensaje() {
        return mensaje;
    }


}
