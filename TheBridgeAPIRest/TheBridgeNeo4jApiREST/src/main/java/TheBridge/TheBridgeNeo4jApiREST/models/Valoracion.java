package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.*;

import java.util.Arrays;
import java.util.List;

@RelationshipProperties
public class Valoracion {

    @RelationshipId
    private String id;
    @Property
    private List<String> votos;
    @Property
    private String mensaje;

    @TargetNode
    private User destinatario;

    public Valoracion() {
    }

    public Valoracion(List<String> votos, User destinatario, String mensaje) {
        this.votos = votos;
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }

    public List<String> getVotos() {
        return votos;
    }

    public User getDestinatario() {
        return destinatario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public boolean isValid() {
        //check if every aptitud is in the enum CategoriasValoracion
        return votos.stream().allMatch(voto -> Arrays.stream(CategoriasValoracion.values()).anyMatch(categoria -> categoria.name().equals(voto)));
    }
}
