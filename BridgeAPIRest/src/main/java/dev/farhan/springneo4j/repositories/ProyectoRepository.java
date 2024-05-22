package dev.farhan.springneo4j.repositories;

import dev.farhan.springneo4j.models.Proyecto;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface ProyectoRepository extends Neo4jRepository<Proyecto, Long> {

    Optional<Proyecto> findProyectoByIdentifier(String identifier);
}
