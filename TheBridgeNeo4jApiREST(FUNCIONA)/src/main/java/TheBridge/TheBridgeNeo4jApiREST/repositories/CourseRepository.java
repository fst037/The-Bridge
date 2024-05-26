package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends Neo4jRepository<Course, UUID> {
    Optional<Course> findCourseById(String identifier);

    @Query("MATCH (:Estudiante {email: $email})-[:ESTUDIA_EN]->(cursos:Curso) RETURN cursos")
    List<Course> findAllEnrolledCoursesByUsername(String email);
}
