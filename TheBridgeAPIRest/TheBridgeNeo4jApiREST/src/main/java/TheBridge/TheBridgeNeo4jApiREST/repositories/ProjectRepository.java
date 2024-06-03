package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Project;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.ProjectTeamCourseQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends Neo4jRepository<Project, UUID> {

    @Query("MATCH (p:Project {identifier: $identifier}) RETURN p")
    Optional<Project> findProjectByIdentifier(String identifier);

    @Query("MATCH (u:User {username: $username})-[:FORMA_PARTE_DE]->(t:Team {identifier: $teamIdentifier}) " +
            "MATCH (u)-[:ESTUDIA_EN]->(c:Course {identifier: $courseIdentifier}) " +
            "RETURN u.username")
    String isUserInCourseAndTeam(String username, String courseIdentifier, String teamIdentifier);

    @Query("MATCH (p:Project {identifier: $identifier}) " +
            "WITH p " +
            "MATCH (p)-[:CON_EQUIPO]->(t:Team) " +
            "MATCH (p)-[:PARA_CURSO]->(c:Course) " +
            "RETURN p as project, t as team, c as course")
    ProjectTeamCourseQueryResult findProjectWithTeamAndCourseByIdentifier(String identifier);

    @Query("MATCH (u:User {username: $username})-[:FORMA_PARTE_DE]->(t:Team) " +
            "WITH t " +
            "MATCH (p)-[:CON_EQUIPO]->(t)" +
            "RETURN collect(p) as project")
    List<Project> findProjectsByUser(String username);

    @Query("MATCH (t:Team {identifier: $teamIdentifier}) " +
            "WITH t " +
            "MATCH (p)-[:CON_EQUIPO]->(t)" +
            "RETURN collect(p) as project")
    List<Project> findProjectsByTeam(String teamIdentifier);

    @Query("MATCH (p)-[:PARA_CURSO]->(c:Course{identifier: $courseIdentifier}) " +
            "WITH p " +
            "MATCH (p)-[:CON_EQUIPO]->(t:Team) " +
            "RETURN collect(p) as project")
    List<Project> findProjectsByCourse(String courseIdentifier);

    @Query("MATCH (u:User {username: $username})-[:FORMA_PARTE_DE]->(t:Team) " +
            "WITH t " +
            "MATCH (p)-[:CON_EQUIPO]->(t) " +
            "WITH p, t " +
            "MATCH (p)-[:PARA_CURSO]->(c:Course) " +
            "RETURN p AS project, t AS team, c AS course")
    List<ProjectTeamCourseQueryResult> findProjectWithTeamAndCourseByUser(String username);

    @Query("MATCH (p:Project {identifier: $projectIdentifier}) " +
            "MATCH (c:Course {identifier: $courseIdentifier}) " +
            "MERGE (p)-[:PARA_CURSO]->(c)")
    void addCourseToProject(String projectIdentifier, String courseIdentifier);

    @Query("MATCH (p:Project {identifier: $projectIdentifier}) " +
            "MATCH (t:Team {identifier: $teamIdentifier}) " +
            "MERGE (p)-[:CON_EQUIPO]->(t)")
    void addTeamToProject(String projectIdentifier, String teamIdentifier);

    @Query("MATCH (p:Project {identifier: $identifier}) " +
            "DETACH DELETE p")
    void deleteProject(String identifier);
}
