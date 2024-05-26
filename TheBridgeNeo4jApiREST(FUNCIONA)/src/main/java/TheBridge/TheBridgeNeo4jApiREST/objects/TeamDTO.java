package TheBridge.TheBridgeNeo4jApiREST.objects;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class TeamDTO {

    private UUID id;
    private List<String> estudiantes = new ArrayList<String>();

    public TeamDTO () {
    }

    public TeamDTO(UUID id, List<String> estudiantes) {
        this.id = id;
        this.estudiantes = estudiantes;
    }

    public List<String> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<String> estudiantes) {
        this.estudiantes = estudiantes;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
