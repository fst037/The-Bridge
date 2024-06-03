package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Subject;

import java.util.List;

public class CoursesOfSubjectQueryResult {

    private List<Course> courses;
    private Subject subject;

    public CoursesOfSubjectQueryResult(List<Course> courses, Subject subject) {
        this.courses = courses;
        this.subject = subject;
    }

    public List<Course> getCourse() {
        return courses;
    }

    public void setCourse(List<Course> course) {
        this.courses = course;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
