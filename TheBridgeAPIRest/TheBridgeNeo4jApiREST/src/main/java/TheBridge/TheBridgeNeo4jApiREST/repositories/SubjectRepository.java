package TheBridge.TheBridgeNeo4jApiREST.repositories;

import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.SubjectsOfCareerQueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubjectRepository extends Neo4jRepository<Subject, UUID> {

    List<Subject> findAll();

    @Query("MATCH (e:Subject {name: $name}) RETURN e")
    Subject findSubjectByName(String name);

    @Query("MATCH (e:Subject {code: $code}) RETURN e")
    Subject findSubjectByCode(String code);

    @Query("MATCH (s:Subject)-[:DE_CARRERA]->(c:Career {code: $careerCode}) " +
            "RETURN c as career, collect(s) as subjects")
    SubjectsOfCareerQueryResult findSubjectsOfCareer(String careerCode);

    @Query("MATCH (s:Subject {code: $subjectCode}) " +
            "MATCH (c:Career {code: $careerCode}) " +
            "MERGE (s)-[:DE_CARRERA]->(c)")
    void addSubjectToCareer(String subjectCode, String careerCode);

    @Query("MATCH (s:Subject {code: $subjectCode}) " +
            "MATCH (c:Career {code: $careerCode}) " +
            "MATCH (s)-[r:DE_CARRERA]->(c) " +
            "DELETE r")
    void removeSubjectFromCareer(String subjectCode, String careerCode);

}
