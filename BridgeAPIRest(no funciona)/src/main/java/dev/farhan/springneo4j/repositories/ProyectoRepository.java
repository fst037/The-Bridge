package dev.farhan.springneo4j.repositories;

import dev.farhan.springneo4j.models.Proyecto;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Optional;

public interface ProyectoRepository extends Neo4jRepository<Proyecto, Long> {

    @Query("MATCH (p:Proyecto {id: $identifier}) RETURN p")
    Optional<Proyecto> findProyectoByIdentifier(String identifier);

}
