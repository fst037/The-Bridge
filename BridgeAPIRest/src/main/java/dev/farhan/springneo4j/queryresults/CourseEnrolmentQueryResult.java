package dev.farhan.springneo4j.queryresults;

import dev.farhan.springneo4j.models.Curso;
import dev.farhan.springneo4j.models.User;

public class CourseEnrolmentQueryResult {
    private User user;
    private Curso curso;

    public CourseEnrolmentQueryResult() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User estudiante) {
        this.user = estudiante;
    }

    public Curso getCourse() {
        return curso;
    }

    public void setCourse(Curso curso) {
        this.curso = curso;
    }
}
