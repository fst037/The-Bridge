package TheBridge.TheBridgeNeo4jApiREST.config;

import TheBridge.TheBridgeNeo4jApiREST.services.NeoUserDetailsService;
import TheBridge.TheBridgeNeo4jApiREST.repositories.UserRepository;
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
