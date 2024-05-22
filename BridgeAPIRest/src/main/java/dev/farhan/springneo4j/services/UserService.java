package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.models.Comentario;
import dev.farhan.springneo4j.models.User;
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

    public User createUser(CreateUserRequest request) {
        User estudiante = userRepository.findEstudianteByEmail(request.getUsername())
                .orElse(new User());

        estudiante.setEnabled(true);
        estudiante.setNombre(request.getName());

        //verificar email educativo y regex
        if (!request.getUsername().matches("^[a-zA-Z0-9._%+-]+@edu.com.ar$")) {
            throw new IllegalArgumentException("Email must be from an educational institution");
        }

        estudiante.setEmail(request.getUsername());
        estudiante.setRoles(request.getRoles());
        estudiante.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(estudiante);

        return estudiante;
    }

    public List<User> getEstudiantesDeCurso(String identifier) {
        return userRepository.findAllEstudiantesDeCurso(identifier);
    }

    public List<User> getEstudiantesByEmails(List<String> emails) {
        return userRepository.findEstudiantesByEmails(emails);
    }

    public User getEstudianteByEmail(String email) {
        return userRepository.findEstudianteByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found" + email));
    }

    public void addComentarioToEstudiante(String email, Comentario comentario) {
        User estudiante = getEstudianteByEmail(email);
        estudiante.recibeComentario(comentario);
        userRepository.save(estudiante);
    }

    public void addValoracionToEstudiante(String email, Valoracion valoracion) {
        User estudiante = getEstudianteByEmail(email);
        estudiante.recibeValoracion(valoracion);
        userRepository.save(estudiante);
    }
}
