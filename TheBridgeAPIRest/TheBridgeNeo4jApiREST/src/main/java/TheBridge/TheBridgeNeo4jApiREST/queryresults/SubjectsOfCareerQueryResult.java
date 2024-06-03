package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Career;
import TheBridge.TheBridgeNeo4jApiREST.models.Subject;

import java.util.List;

public class SubjectsOfCareerQueryResult {

    private Career career;
    private List<Subject> subjects;

    public SubjectsOfCareerQueryResult(Career career, List<Subject> subjects) {
        this.career = career;
        this.subjects = subjects;
    }

    public Career getCareer() {
        return career;
    }

    public void setCareer(Career career) {
        this.career = career;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubject(List<Subject> subjects) {
        this.subjects = subjects;
    }
}
