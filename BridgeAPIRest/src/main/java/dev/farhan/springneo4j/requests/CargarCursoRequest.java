package dev.farhan.springneo4j.requests;

import java.util.List;

public class CargarCursoRequest {
    private String materia;
    private String identificador;
    private List<String> emailsEstudiantes;
    private String emailProfesor;

    public CargarCursoRequest(String materia, String identificador, List<String> emailsEstudiantes, String emailProfesor) {
        this.materia = materia;
        this.identificador = identificador;
        this.emailsEstudiantes = emailsEstudiantes;
        this.emailProfesor = emailProfesor;
    }

    public String getMateria() {
        return materia;
    }

    public String getIdentificador() {
        return identificador;
    }

    public List<String> getEmailsEstudiantes() {
        return emailsEstudiantes;
    }

    public String getEmailProfesor() {
        return emailProfesor;
    }
}
