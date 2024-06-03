package TheBridge.TheBridgeNeo4jApiREST.services;


import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.CourseDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CoursesOfSubjectQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.CourseRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(
            CourseRepository courseRepository
    ) {
        this.courseRepository = courseRepository;
    }

    public CoursesOfSubjectQueryResult createCourse(String code, String name, String subjectCode) {
        Course course = courseRepository.findCourseByCode(code);

        if (course == null) {
            course = new Course(code, name);
            courseRepository.save(course);
            courseRepository.addCourseToSubject(code, subjectCode);
        }

        return courseRepository.findCoursesOfSubject(subjectCode);
    }

    public Course getCourseByIdentifier(String identifier) {
        return courseRepository.findCourseByIdentifier(identifier);
    }

    public Course getCourseByCode(String code) {
        return courseRepository.findCourseByCode(code);
    }

    public CoursesOfSubjectQueryResult getCoursesOfSubject(String subjectCode) {
        return courseRepository.findCoursesOfSubject(subjectCode);
    }

    public CoursesOfSubjectQueryResult addCourseToSubject(String courseCode, String subjectCode) {
        courseRepository.addCourseToSubject(courseCode, subjectCode);

        return courseRepository.findCoursesOfSubject(subjectCode);
    }

    public CoursesOfSubjectQueryResult removeCourseFromSubject(String courseCode, String subjectCode) {
        courseRepository.removeCourseFromSubject(courseCode, subjectCode);

        return courseRepository.findCoursesOfSubject(subjectCode);
    }

    public CourseDTO getUsersOfCourse(String courseCode) {
        return courseRepository.findUsersOfCourse(courseCode).toCourseDTO();
    }

    public CourseDTO addUserToCourse(String username, String courseCode) {
        courseRepository.addUserToCourse(username, courseCode);

        return courseRepository.findUsersOfCourse(courseCode).toCourseDTO();
    }

    public CourseDTO removeUserFromCourse(String username, String courseCode) {
        courseRepository.removeUserFromCourse(username, courseCode);

        return courseRepository.findUsersOfCourse(courseCode).toCourseDTO();
    }
}
