package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class NeoUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public NeoUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository
                .findEstudianteByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found" + email));
    }
}
