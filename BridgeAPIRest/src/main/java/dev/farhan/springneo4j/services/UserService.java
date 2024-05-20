package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.models.Comentario;
import dev.farhan.springneo4j.models.Estudiante;
import dev.farhan.springneo4j.models.Valoracion;
import dev.farhan.springneo4j.repositories.UserRepository;
import dev.farhan.springneo4j.requests.CreateUserRequest;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Estudiante createUser(CreateUserRequest request) {
        Estudiante estudiante = new Estudiante();

        estudiante.setNombre(request.getName());
        estudiante.setEmail(request.getUsername());
        estudiante.setRoles(request.getRoles());
        estudiante.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(estudiante);

        return estudiante;
    }

    public List<Estudiante> getEstudiantesDeCurso(String identifier) {
        return userRepository.findAllEstudiantesDeCurso(identifier);
    }

    public Estudiante getEstudianteByEmail(String email) {
        return userRepository.findEstudianteByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found" + email));
    }

    public void addComentarioToEstudiante(String email, Comentario comentario) {
        Estudiante estudiante = getEstudianteByEmail(email);
        estudiante.recibeComentario(comentario);
        userRepository.save(estudiante);
    }

    public void addValoracionToEstudiante(String email, Valoracion valoracion) {
        Estudiante estudiante = getEstudianteByEmail(email);
        estudiante.recibeValoracion(valoracion);
        userRepository.save(estudiante);
    }
}
