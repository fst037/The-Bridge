package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CoursesOfSubjectQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.UsersOfCourseQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends Neo4jRepository<Course, UUID> {

    @Query("MATCH (e:Course {identifier: $identifier}) RETURN e")
    Course findCourseByIdentifier(String identifier);

    @Query("MATCH (e:Course {code: $code}) RETURN e")
    Course findCourseByCode(String code);

    @Query("MATCH (s:Subject {code: $subjectCode}) " +
            "MATCH (c:Course)-[:DE_MATERIA]->(s) " +
            "RETURN collect(c) as courses, s as subject")
    CoursesOfSubjectQueryResult findCoursesOfSubject(String subjectCode);

    @Query("MATCH (c:Course {code: $courseCode}) " +
            "WITH c " +
            "MATCH (s:Subject {code: $subjectCode}) " +
            "MERGE (c)-[:DE_MATERIA]->(s) ")
    void addCourseToSubject(String courseCode, String subjectCode);

    @Query("MATCH (c:Course {code: $courseCode}) " +
            "WITH c " +
            "MATCH (s:Subject {code: $subjectCode}) " +
            "MATCH (c)-[r:DE_MATERIA]->(s) " +
            "DELETE r")
    void removeCourseFromSubject(String courseCode, String subjectCode);

    @Query("MATCH (c:Course {code: $courseCode}) " +
            "MATCH (c)<-[:ESTUDIA_EN]-(u:User) " +
            "RETURN c as course, collect(u) as users")
    UsersOfCourseQueryResult findUsersOfCourse(String courseCode);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course {code: $courseCode}) " +
            "MERGE (u)-[:ESTUDIA_EN]->(c)")
    void addUserToCourse(String username, String courseCode);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course {code: $courseCode}) " +
            "MATCH (u)-[r:ESTUDIA_EN]->(c) " +
            "DELETE r")
    void removeUserFromCourse(String username, String courseCode);

}
