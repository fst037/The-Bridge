package dev.farhan.springneo4j.repositories;

import dev.farhan.springneo4j.models.Materia;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface MateriaRepository extends Neo4jRepository<Materia, Long> {
    Optional<Materia> findMateriaByNombre(String nombre);
}
