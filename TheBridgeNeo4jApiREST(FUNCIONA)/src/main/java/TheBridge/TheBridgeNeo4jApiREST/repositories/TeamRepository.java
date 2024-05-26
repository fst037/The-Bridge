package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamRepository  extends Neo4jRepository<Team, UUID> {

    @Query("MATCH (e:Team {id: $identifier}) RETURN e")
    Optional<Team> findTeamByIdentifier(String identifier);

    @Query("MATCH (p:User{username: $username})-[:FORMA_PARTE_DE]->(e:Team) RETURN e")
    List<Team> findTeamsByStudent(String username);
}
