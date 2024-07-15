package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.CommentDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CommonBuilderQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.UserSkillsQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Arrays;
import java.util.List;
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

    @Query("MATCH (n)-[c:COMENTO_A]->(u:User{username: $username}) RETURN c.mensaje as mensaje, n.username as remitente, u.username as destinatario, c.timestamp as timestamp, c.visible as visible")
    List<CommentDTO> getCommentsByUser(String username);

    @Query("MATCH (n)-[c:COMENTO_A]->(u:User{username: $username}) WHERE c.visible = true RETURN c.mensaje as mensaje, n.username as remitente, u.username as destinatario, c.timestamp as timestamp, c.visible as visible")
    List<CommentDTO> getVisibleCommentsByUser(String username);

    @Query("MATCH (n:User{username: $emailRemitente}), (u:User{username: $emailDestinatario}) " +
            "OPTIONAL MATCH (u)-[s:BUILDER_CON{aceptada:false}]->(n) " +
            "WITH n, u, s " +
            "CALL apoc.do.when(s IS NOT NULL, " +
            "'SET s.aceptada = true RETURN s', " +
            "'MERGE (n)-[r:BUILDER_CON]->(u) SET r.aceptada = CASE WHEN r.aceptada <> true THEN false ELSE r.aceptada END " +
            "RETURN r', " +
            "{n:n, u:u, s:s}) YIELD value " +
            "RETURN value.r IS NOT NULL")
    Boolean enviarSolicitudBuilder(String emailRemitente, String emailDestinatario);

    @Query("MATCH (n:User{username: $emailRemitente})-[s:BUILDER_CON{aceptada:false}]->(u:User{username: $emailDestinatario}) SET s.aceptada = true")
    void aceptarSolicitudBuilder(String emailRemitente, String emailDestinatario);

    @Query("MATCH (n:User{username: $emailRemitente})-[s:BUILDER_CON]-(u:User{username: $emailDestinatario}) DELETE s")
    void eliminarBuilder(String emailRemitente, String emailDestinatario);

    @Query("MATCH (u:User)-[s:BUILDER_CON{aceptada:false}]->(n:User{username: $emailDestinatario}) RETURN u")
    List<User> findSolicitudesRecibidasBuilder(String emailDestinatario);

    @Query("MATCH (n:User)-[s:BUILDER_CON{aceptada:true}]-(u:User{username: $email}) RETURN n")
    List<User> findBuilders(String email);

    @Query("MATCH (u:User {username: $email})-[:BUILDER_CON {aceptada: true}]-(b:User) " +
            "WITH u, b " +
            "MATCH (b)-[:BUILDER_CON {aceptada: true}]-(n:User) " +
            "WHERE n <> u AND NOT (u)-[:BUILDER_CON {aceptada: true}]-(n) " +
            "RETURN DISTINCT count(b) AS commonBuilders, n.username AS username, n.name AS name, n.legajo AS legajo ORDER BY commonBuilders DESC")
    List<CommonBuilderQueryResult> findCommonBuilders(String email);

    @Query("MATCH (n)-[v:VALORO_A]->(u:User{username: $username}) " +
            "WITH apoc.text.join(v.votos, \",\") AS votos " +
            "RETURN apoc.text.join(collect(votos), \",\")")
    String getSkillsByUsername(String username);

    @Query("MATCH (c:Course {code: $courseCode})<-[:ESTUDIA_EN{disponible:true}]-(u:User) " +
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
    List<UserSkillsQueryResult> getAvailableUsersSkillsByCourse(String courseCode);

    @Query("MATCH (u:User {username: $username}) SET u.introduction = $introduction RETURN u")
    User modifyUserIntroduction(String username, String introduction);

    @Query("MATCH (u:User{username: $username}) RETURN exists((u)-[:VALORO_A]->(u))")
    Boolean checkRealizoEncuesta(String username);

    @Query("MATCH (u:User {username: $username})-[:ESTUDIA_EN]->(c:Course)<-[:ESTUDIA_EN]-(known:User) " +
            "WHERE known.username <> $username " +
            "RETURN DISTINCT known")
    List<User> getConocidos(String username);
}
