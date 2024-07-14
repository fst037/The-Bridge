package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.TeamUsersQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamRepository  extends Neo4jRepository<Team, UUID> {

    @Query("MATCH (e:Team {identifier: $identifier}) RETURN e")
    Team findTeamByIdentifier(String identifier);

    @Query("MATCH (e:Team {identifier: $identifier}) " +
            "WITH e " +
            "MATCH (s:User)-[:FORMA_PARTE_DE]->(e) " +
            "RETURN e as team, collect(s) as users")
    TeamUsersQueryResult findTeamWithUsersByIdentifier(String identifier);

    @Query("MATCH (u:User{username: $username})-[:FORMA_PARTE_DE]->(e:Team) " +
            "WITH e, u " +
            "MATCH (s:User)-[:FORMA_PARTE_DE]->(e) " +
            "RETURN e as team, collect(s) as users")
    List<TeamUsersQueryResult> findTeamsWithUsersByUsername(String username);

    @Query("MATCH (p:User{username: $username})-[:FORMA_PARTE_DE]->(e:Team) RETURN e")
    List<Team> findTeamsByStudent(String username);

    @Query("MATCH (user:User{username: $username}) " +
            "WITH user " +
            "MATCH (e:Team{identifier: $identifier}) " +
            "MERGE (user)-[:FORMA_PARTE_DE]->(e) RETURN user.username as username, user.name as name, user.legajo as legajo")
    UserDTO addFirstStudentToTeam(String username, String identifier);

    @Query("MATCH (d:User{username: $propietario})-[:FORMA_PARTE_DE]->(e:Team {identifier: $identifier}) " +
            "WITH e " +
            "MATCH (u:User {username: $username}) " +
            "MERGE (u)-[:FORMA_PARTE_DE]->(e) ")
    void addStudentToTeam(String propietario, String username, String identifier);

    @Query("MATCH (d:User{username: $propietario})-[:FORMA_PARTE_DE]->(e:Team {identifier: $identifier}) " +
            "WITH e " +
            "MATCH (d:User{username: $username})-[r:FORMA_PARTE_DE]->(e) " +
            "DELETE r")
    void removeStudentFromTeam(String propietario, String username, String identifier);

    @Query("MATCH (t:Team {identifier: $identifier}) " +
            "SET t.nombre = $newName ")
    void updateTeamName(String identifier, String newName);
}
