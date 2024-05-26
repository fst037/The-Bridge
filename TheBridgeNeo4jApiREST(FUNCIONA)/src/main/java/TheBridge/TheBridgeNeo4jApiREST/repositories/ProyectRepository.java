package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Proyect;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Optional;
import java.util.UUID;

public interface ProyectRepository extends Neo4jRepository<Proyect, UUID> {

    @Query("MATCH (p:Proyecto {id: $identifier}) RETURN p")
    Optional<Proyect> findProyectByIdentifier(String identifier);

}
