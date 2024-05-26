package dev.farhan.springneo4j.config;

import dev.farhan.springneo4j.repositories.UserRepository;
import dev.farhan.springneo4j.services.NeoUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NeoUserDetailsServiceConfig {

    private final UserRepository userRepository;

    public NeoUserDetailsServiceConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public NeoUserDetailsService neoUserDetailsService() {
        return new NeoUserDetailsService(userRepository);
    }
}
