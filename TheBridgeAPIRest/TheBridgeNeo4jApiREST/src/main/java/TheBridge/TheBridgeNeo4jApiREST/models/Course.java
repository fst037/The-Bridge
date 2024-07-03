package TheBridge.TheBridgeNeo4jApiREST.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;
import java.util.UUID;

@Node
public class Course {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID identifier;
    private String code;
    private String name;
    private String shift;
    private String day;
    private String period;

    public Course() {
    }

    public Course(String code, String name, String shift, String day, String period) {
        this.code = code;
        this.name = name;
        this.shift = shift;
        this.day = day;
        this.period = period;
    }

    public UUID getIdentifier() {
        return identifier;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
}
