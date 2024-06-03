package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.List;

public class VotosDTO {
    private List<String> votos;

    public VotosDTO(List<String> votos) {
        this.votos = votos;
    }

    public List<String> getVotos() {
        return votos;
    }

    public void setVotos(List<String> votos) {
        this.votos = votos;
    }
}
