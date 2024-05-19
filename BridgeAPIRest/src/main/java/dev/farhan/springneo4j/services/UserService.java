package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.models.Estudiante;
import dev.farhan.springneo4j.repositories.UserRepository;
import dev.farhan.springneo4j.requests.CreateUserRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Estudiante createUser(CreateUserRequest request) {
        Estudiante user = new Estudiante();

        user.setName(request.getName());
        // TODO: make sure that this username doesn't exist.
        user.setUsername(request.getUsername());
        user.setRoles(request.getRoles());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return user;
    }
}
