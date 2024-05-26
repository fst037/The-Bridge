package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

import java.util.Arrays;

@RelationshipProperties
public class Valoracion {

    @RelationshipId
    private String id;
    @Property
    private String aptitud1;
    @Property
    private String aptitud2;
    @Property
    private String aptitud3;
    @Property
    private String mensaje;

    @TargetNode
    private User destinatario;

    public Valoracion() {
    }

    public Valoracion(String aptitud1, String aptitud2, String aptitud3, User destinatario, String mensaje) {
        this.aptitud1 = aptitud1;
        this.aptitud2 = aptitud2;
        this.aptitud3 = aptitud3;
        this.destinatario = destinatario;
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

    public User getDestinatario() {
        return destinatario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public boolean isValid() {
        //check if every aptitud is in the enum CategoriasValoracion
        return Arrays.stream(CategoriasValoracion.values()).anyMatch(c -> c.name().equals(aptitud1)) &&
                Arrays.stream(CategoriasValoracion.values()).anyMatch(c -> c.name().equals(aptitud2)) &&
                Arrays.stream(CategoriasValoracion.values()).anyMatch(c -> c.name().equals(aptitud3));
    }
}
