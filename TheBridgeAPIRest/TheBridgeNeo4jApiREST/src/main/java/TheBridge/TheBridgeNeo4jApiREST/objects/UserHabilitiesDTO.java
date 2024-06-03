package TheBridge.TheBridgeNeo4jApiREST.objects;

public class UserHabilitiesDTO {

    private String name;
    private String username;
    private String legajo;
    private int liderazgo;
    private int organizacion;
    private int ideacion;
    private int desarrollo;
    private int comunicación;

    public UserHabilitiesDTO(String name, String username, String legajo) {
        this.name = name;
        this.username = username;
        this.legajo = legajo;
    }

    public int getLiderazgo() {
        return liderazgo;
    }

    public void setLiderazgo(int liderazgo) {
        this.liderazgo = liderazgo;
    }

    public int getOrganizacion() {
        return organizacion;
    }

    public void setOrganizacion(int organizacion) {
        this.organizacion = organizacion;
    }

    public int getIdeacion() {
        return ideacion;
    }

    public void setIdeacion(int ideacion) {
        this.ideacion = ideacion;
    }

    public int getDesarrollo() {
        return desarrollo;
    }

    public void setDesarrollo(int desarrollo) {
        this.desarrollo = desarrollo;
    }

    public int getComunicación() {
        return comunicación;
    }

    public void setComunicación(int comunicación) {
        this.comunicación = comunicación;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
}
