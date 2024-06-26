package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.CategoriasValoracion;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class UserSkillsDTO {

    private String name;
    private String username;
    private String legajo;
    private HashMap<String, Float> skills;

    public UserSkillsDTO(UserDTO userDTO, HashMap<String, Float> skills) {
        this.name = userDTO.getName();
        this.username = userDTO.getUsername();
        this.legajo = userDTO.getLegajo();
        this.skills = skills;
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

    public HashMap<String, Float> getSkills() {
        return skills;
    }

    public void setSkills(HashMap<String, Float> skills) {
        this.skills = skills;
    }

    public static Float getCompatibility(List<UserSkillsDTO> userSkills){
        HashMap<String, Float> skills = new HashMap<>();

        Float sumaSkills = 0f;

        for (String skill : Arrays.stream(CategoriasValoracion.values()).map(CategoriasValoracion::name).toList()) {
            skills.put(skill, 0f);

            for (UserSkillsDTO userSkill : userSkills) {
                if (userSkill.getSkills().containsKey(skill)) {
                    skills.put(skill, skills.get(skill) + userSkill.getSkills().get(skill));
                    sumaSkills += userSkill.getSkills().get(skill);
                }
            }
        }

        Float media = (float) userSkills.size() / skills.size();

        Double sumaDiferencia = 0d;

        for (String skill : skills.keySet()) {
            sumaDiferencia += Math.abs(skills.get(skill) - media);
        }

        Float diferenciaPromedio = (float) (sumaDiferencia / skills.size());

        Float peorDiferenciaPromedio = ((3*((float)userSkills.size()/3 - media) + (skills.size() - 3)*(media)) / skills.size());

        return (float) (1 - diferenciaPromedio/peorDiferenciaPromedio);
    }
}
