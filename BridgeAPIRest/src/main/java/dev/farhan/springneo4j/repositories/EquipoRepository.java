package dev.farhan.springneo4j.repositories;
import dev.farhan.springneo4j.models.Equipo;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import java.util.List;
import java.util.Optional;

public interface EquipoRepository extends Neo4jRepository<Equipo, Long> {

    @Query("MATCH (e:Equipo {id: $identifier}) RETURN e")
    Optional<Equipo> findEquipoByIdentifier(String identifier);

    @Query("MATCH (p:Estudiante{username: $username})-[:FORMA_PARTE_DE]->(e:Equipo) RETURN e")
    List<Equipo> findEquipoByEstudiante(String username);

}
