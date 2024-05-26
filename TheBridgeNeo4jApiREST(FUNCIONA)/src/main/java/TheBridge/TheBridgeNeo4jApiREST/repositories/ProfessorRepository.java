package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Professor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProfessorRepository extends Neo4jRepository<Professor, UUID> {
    Optional<Professor> findProfesorByEmail(String email);
}
