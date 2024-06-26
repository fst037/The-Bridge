package TheBridge.TheBridgeNeo4jApiREST.queryresults;

public class CommonBuilderQueryResult {
    private Integer commonBuilders;
    private String username;
    private String name;
    private String legajo;

    public CommonBuilderQueryResult(String legajo, String name, String username, Integer commonBuilders) {
        this.legajo = legajo;
        this.name = name;
        this.username = username;
        this.commonBuilders = commonBuilders;
    }

    public Integer getCommonBuilders() {
        return commonBuilders;
    }

    public void setCommonBuilders(Integer commonBuilders) {
        this.commonBuilders = commonBuilders;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
}
