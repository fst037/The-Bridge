package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;

public class ValoracionDTO {
    private String destinatario;
    private String aptitud1;
    private String aptitud2;
    private String aptitud3;

    public ValoracionDTO(Valoracion valoracion){
        this.destinatario = valoracion.getDestinatario().getUsername();
        this.aptitud1 = valoracion.getAptitud1();
        this.aptitud2 = valoracion.getAptitud2();
        this.aptitud3 = valoracion.getAptitud3();
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
}
