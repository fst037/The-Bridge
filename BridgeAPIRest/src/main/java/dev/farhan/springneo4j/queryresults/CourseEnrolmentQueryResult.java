package dev.farhan.springneo4j.queryresults;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.Estudiante;

public class CourseEnrolmentQueryResult {
    private Estudiante user;
    private Curso curso;

    public CourseEnrolmentQueryResult() {
    }

    public Estudiante getUser() {
        return user;
    }

    public void setUser(Estudiante estudiante) {
        this.user = estudiante;
    }

    public Curso getCourse() {
        return curso;
    }

    public void setCourse(Curso curso) {
        this.curso = curso;
    }
}
