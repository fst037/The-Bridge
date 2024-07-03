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

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (u)-[:ESTUDIA_EN]->(c:Course) " +
            "RETURN collect(c) as courses")
    List<Course> findCoursesOfUser(String username);

    @Query("CREATE (c:Course {code: $code, name: $name, shift: $shift, day: $day, period: $period}) RETURN c")
    Course createCourse(String code, String name, String shift, String day, String period);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course) " +
            "WHERE c.code IN $courseCodes " +
            "MERGE (u)-[:ESTUDIA_EN{disponible:true}]->(c)")
    void addUserToCourses(String username, List<String> courseCodes);

    @Query("MATCH (s:Subject {code: $subjectCode}) " +
            "MATCH (c:Course)-[:DE_MATERIA]->(s) " +
            "RETURN collect(c) as courses, s as subject")
    CoursesOfSubjectQueryResult findCoursesOfSubject(String subjectCode);

    @Query("MATCH (s:Subject {name: $subjectName}) " +
            "MATCH (c:Course)-[:DE_MATERIA]->(s) " +
            "RETURN collect(c) as courses, s as subject")
    CoursesOfSubjectQueryResult findCoursesOfSubjectByName(String subjectName);

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
            "MERGE (u)-[:ESTUDIA_EN{disponible:true}]->(c)")
    void addUserToCourse(String username, String courseCode);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course {code: $courseCode}) " +
            "MATCH (u)-[r:ESTUDIA_EN]->(c) " +
            "SET r.disponible = $available " +
            "RETURN r IS NOT NULL")
    boolean setUserAvailabilityInCourse(String username, String courseCode, boolean available);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course {code: $courseCode}) " +
            "MATCH (u)-[r:ESTUDIA_EN]->(c) " +
            "DELETE r")
    void removeUserFromCourse(String username, String courseCode);

    @Query("MATCH (u:User {username: $username}) " +
            "MATCH (c:Course {code: $courseCode}) " +
            "MATCH (u)-[r:ESTUDIA_EN]->(c) " +
            "RETURN r.disponible")
    boolean getUserAvailabilityInCourse(String username, String courseCode);
}
