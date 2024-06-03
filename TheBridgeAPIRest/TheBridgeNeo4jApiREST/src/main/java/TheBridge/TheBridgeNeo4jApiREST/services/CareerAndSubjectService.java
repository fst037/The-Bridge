package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Career;
import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.SubjectsOfCareerQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.CareerRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerAndSubjectService {
    private final CareerRepository careerRepository;
    private final SubjectRepository subjectRepository;

    public CareerAndSubjectService(CareerRepository careerRepository, SubjectRepository subjectRepository) {
        this.careerRepository = careerRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Career createCareer(String name, String code, String facultad) {
        Career career = new Career(name, code, facultad);

        return careerRepository.save(career);
    }

    public Subject createSubject(String name, String code) {
        Subject subject = new Subject(name, code);

        return subjectRepository.save(subject);
    }

    public Career getCareerByCode(String code) {
        return careerRepository.findCareerByCode(code);
    }

    public SubjectsOfCareerQueryResult getSubjectsOfCareer(String careerCode) {
        return subjectRepository.findSubjectsOfCareer(careerCode);
    }

    public SubjectsOfCareerQueryResult addSubjectToCareer(String subjectCode, String careerCode) {
        subjectRepository.addSubjectToCareer(subjectCode, careerCode);

        return subjectRepository.findSubjectsOfCareer(careerCode);
    }

    public SubjectsOfCareerQueryResult removeSubjectFromCareer(String subjectCode, String careerCode) {
        subjectRepository.removeSubjectFromCareer(subjectCode, careerCode);

        return subjectRepository.findSubjectsOfCareer(careerCode);
    }
}
