package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.CategoriasValoracion;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.neo4j.core.schema.CompositeProperty;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;

public class UserSkillsQueryResult {
    private String name;

    private String username;

    private String legajo;

    private String skillVotesJson;

    public UserSkillsQueryResult() {
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

    public String getSkillVotesJson() {
        return skillVotesJson;
    }

    public void setSkillVotesJson(String skillVotesJson) {
        this.skillVotesJson = skillVotesJson;
    }

    public HashMap<String, Float> calculateProportionalSkills() {

        HashMap<String, Float> proportionalSkills = new HashMap<>();

        if (Objects.equals(skillVotesJson, "{}")) {
            for (String skill : Arrays.stream(CategoriasValoracion.values()).map(CategoriasValoracion::name).toList()) {
                proportionalSkills.put(skill, 0.6f / CategoriasValoracion.values().length);
            }
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Integer> skillVotesMap = mapper.readValue(skillVotesJson, new TypeReference<Map<String, Integer>>() {
            });

            int totalSkills = 0;

            for (String skill : skillVotesMap.keySet()) {
                totalSkills += skillVotesMap.get(skill);
            }

            for (String skill : skillVotesMap.keySet()) {
                proportionalSkills.put(skill, (float) skillVotesMap.get(skill) / totalSkills);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return proportionalSkills;
    }
}
