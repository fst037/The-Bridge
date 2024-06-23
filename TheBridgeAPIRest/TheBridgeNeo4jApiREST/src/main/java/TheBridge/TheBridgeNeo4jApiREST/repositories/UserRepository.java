package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.CommentDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserSkillsDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.ValoracionDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.VotosDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.UserSkillsQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends Neo4jRepository<User, UUID> {
    Optional<User> findUserByUsername(String email);

    @Query("MATCH (estudiante:User) WHERE estudiante.username IN $emails RETURN estudiante")
    List<User> findStudentsByEmails(List<String> emails);

    @Query("MATCH (destinatario:User {username: $emailDestinatario}) " +
            "MATCH (remitente:User {username: $emailRemitente}) " +
            "CREATE (remitente)-[:COMENTO_A {mensaje: $mensaje, timestamp: $fecha, visible: true}]->(destinatario)")
    String comentarPerfilCompañero(String emailRemitente, String emailDestinatario, String mensaje, String fecha);

    @Query("MATCH (r:User{username: $emailRemitente})-[c:COMENTO_A {timestamp: $fecha}]->(d:User{username: $emailDestinatario}) " +
            "SET c.visible = false RETURN c")
    void ocultarComentario(String emailRemitente, String emailDestinatario, String fecha);

    @Query("MATCH (r:User{username: $emailRemitente})-[c:COMENTO_A {timestamp: $fecha}]->(d:User{username: $emailDestinatario}) " +
            "SET c.visible = true RETURN c")
    void mostrarComentario(String emailRemitente, String emailDestinatario, String fecha);

    @Query("MATCH (destinatario:User {username: $emailDestinatario}) " +
            "MATCH (remitente:User {username: $emailRemitente}) " +
            "MERGE (remitente)-[r:VALORO_A]->(destinatario)" +
            "SET r.votos = $votos, r.mensaje = $mensaje, r.timestamp = $fecha")
    String valorarPerfilCompañero(String emailRemitente, String emailDestinatario, List<String> votos, String mensaje, String fecha);

    @Query("MATCH (n)-[c:COMENTO_A]->(u:User{username: $username}) RETURN c.mensaje as mensaje, n.username as remitente, u.username as destinatario, c.timestamp as timestamp")
    List<CommentDTO> getCommentsByUser(String username);

    @Query("MATCH (n)-[c:COMENTO_A]->(u:User{username: $username}) WHERE c.visible = true RETURN c.mensaje as mensaje, n.username as remitente, u.username as destinatario, c.timestamp as timestamp")
    List<CommentDTO> getVisibleCommentsByUser(String username);

    @Query("MATCH (n)-[v:VALORO_A]->(u:User{username: $username}) " +
            "WITH apoc.text.join(v.votos, \",\") AS votos " +
            "RETURN apoc.text.join(collect(votos), \",\")")
    String getSkillsByUsername(String username);

    @Query("MATCH (c:Course {code: $courseCode})<-[:ESTUDIA_EN]-(u:User) " +
            "OPTIONAL MATCH (u)<-[v:VALORO_A]-(:User) " +
            "WITH u, v.votos AS votos " +
            "UNWIND coalesce(votos, [null]) AS voto " +
            "WITH u, voto, count(voto) AS count " +
            "WITH u, collect([voto, count]) AS skillVotePairs " +
            "WITH u, apoc.map.fromPairs(skillVotePairs) AS skillVotesMap " +
            "RETURN u.name AS name, u.username AS username, u.legajo AS legajo, " +
            "CASE WHEN size(keys(skillVotesMap)) = 1 AND keys(skillVotesMap)[0] IS NULL THEN '{}' " +
            "ELSE apoc.convert.toJson(skillVotesMap) " +
            "END AS skillVotesJson")
    List<UserSkillsQueryResult> getUsersSkillsByCourse(String courseCode);

    @Query("MATCH (u:User {username: $username}) SET u.introduction = $introduction RETURN u")
    User modifyUserIntroduction(String username, String introduction);
}
