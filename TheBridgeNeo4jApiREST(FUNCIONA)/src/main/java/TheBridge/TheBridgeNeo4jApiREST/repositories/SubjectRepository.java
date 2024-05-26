package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;
import java.util.UUID;

public interface SubjectRepository extends Neo4jRepository<Subject, UUID> {
    Optional<Subject> findSubjectByName(String nombre);
}
