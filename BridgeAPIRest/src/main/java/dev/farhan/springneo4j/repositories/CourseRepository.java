package dev.farhan.springneo4j.repositories;

import dev.farhan.springneo4j.models.Curso;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends Neo4jRepository<Curso, Long> {
    Optional<Curso> findCourseByIdentifier(String identifier);

    @Query("MATCH (:Estudiante {email: $email})-[:ENROLLED_IN]->(cursos:Curso) RETURN cursos")
    List<Curso> findAllEnrolledCoursesByUsername(String email);
}
