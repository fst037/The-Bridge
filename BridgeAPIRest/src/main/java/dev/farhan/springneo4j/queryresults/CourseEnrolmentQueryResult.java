package dev.farhan.springneo4j.queryresults;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.Estudiante;

public class CourseEnrolmentQueryResult {
    private Estudiante user;
    private Curso course;

    public CourseEnrolmentQueryResult() {
    }

    public Estudiante getUser() {
        return user;
    }

    public void setUser(Estudiante user) {
        this.user = user;
    }

    public Curso getCourse() {
        return course;
    }

    public void setCourse(Curso course) {
        this.course = course;
    }
}
