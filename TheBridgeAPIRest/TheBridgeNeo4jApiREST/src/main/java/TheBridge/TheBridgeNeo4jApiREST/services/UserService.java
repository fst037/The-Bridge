package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateUserRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    };
    public User getUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found" + username));
    }

    public User createUser(CreateUserRequest request) {
        User estudiante = userRepository.findUserByUsername(request.getUsername())
                .orElse(new User());

        if (estudiante.getPassword() != null && !Objects.equals(estudiante.getPassword(), request.getPassword())) {
            return null;
        }

        // check email regex
        if (!request.getUsername().matches("^[a-zA-Z0-9._%+-]+@uade.edu.ar$")) {
            return null;
        }

        estudiante.setName(request.getName());
        estudiante.setUsername(request.getUsername());
        estudiante.setLegajo(request.getLegajo());
        estudiante.setEnabled(true);
        estudiante.setRoles(request.getRoles());
        estudiante.setContactLinks(new ArrayList<String>());
        estudiante.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(estudiante);

        return estudiante;
    }

    public int preCreateUser(CreateUserRequest request) {
        User estudiante = userRepository.findUserByUsername(request.getUsername())
                .orElse(new User());

        if (estudiante.getUsername() == request.getUsername()) {
            return 0;
        }

        // check email regex
        if (!request.getUsername().matches("^[a-zA-Z0-9._%+-]+@uade.edu.ar$")) {
            return 0;
        }

        estudiante.setName(request.getName());
        estudiante.setUsername(request.getUsername());
        estudiante.setLegajo(request.getLegajo());

        userRepository.save(estudiante);
        return 1;
    }

    public User modifyUserIntroduction(String username, String introduction) {
        return userRepository.modifyUserIntroduction(username, introduction);
    }

    public User setContactLinks(String username, List<String> contactLinks) {
        User estudiante = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found" + username));

        if (estudiante.getContactLinks() == null) {
            estudiante.setContactLinks(new ArrayList<>());
        }

        estudiante.setContactLinks(contactLinks);

        return userRepository.save(estudiante);
    }
}
