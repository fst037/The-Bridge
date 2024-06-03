package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Career;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.UUID;

public interface CareerRepository extends Neo4jRepository<Career, UUID>{

    List<Career> findAll();

    @Query("MATCH (e:Career {identifier: $identifier}) RETURN e")
    Career findCareerByIdentifier(String identifier);

    @Query("MATCH (e:Career {code: $code}) RETURN e")
    Career findCareerByCode(String code);

    @Query("MATCH (e:Career {facultad: $facultad}) RETURN e")
    List<Career> findCareersByFacultad(String facultad);
}
