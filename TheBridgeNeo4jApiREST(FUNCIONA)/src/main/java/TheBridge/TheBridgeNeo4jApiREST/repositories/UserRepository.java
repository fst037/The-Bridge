package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Comentario;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends Neo4jRepository<User, UUID> {
    Optional<User> findUserByUsername(String email);

    @Query("MATCH (estudiante:User) WHERE estudiante.username IN $emails RETURN estudiante")
    List<User> findStudentsByEmails(List<String> emails);
}
