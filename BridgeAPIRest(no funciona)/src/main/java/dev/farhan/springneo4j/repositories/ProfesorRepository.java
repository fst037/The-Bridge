package dev.farhan.springneo4j.repositories;

import dev.farhan.springneo4j.models.Profesor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface ProfesorRepository extends Neo4jRepository<Profesor, Long> {
    Optional<Profesor> findProfesorByEmail(String email);
}
