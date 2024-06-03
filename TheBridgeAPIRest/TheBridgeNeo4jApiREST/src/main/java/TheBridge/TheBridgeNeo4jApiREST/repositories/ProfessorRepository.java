package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Professor;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Optional;
import java.util.UUID;

public interface ProfessorRepository extends Neo4jRepository<Professor, UUID> {

    @Query("MATCH (professor:Professor {email: $email}) RETURN professor")
    Optional<Professor> findProfessorByEmail(String email);
}
