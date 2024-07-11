package TheBridge.TheBridgeNeo4jApiREST.services;


import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.objects.CourseDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.CoursesOfSubjectQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.UsersOfCourseQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.repositories.CourseRepository;
import TheBridge.TheBridgeNeo4jApiREST.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(
            CourseRepository courseRepository
    ) {
        this.courseRepository = courseRepository;
    }

    public CoursesOfSubjectQueryResult createCourse(String code, String name, String shift, String day, String period) {
        Course course = courseRepository.findCourseByCode(code);

        if (course != null) {

            String[] words = name.split(" ");
            for (int i = 0; i < words.length; i++) {
                words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1).toLowerCase();
            }

            name = String.join(" ", words);

            courseRepository.createCourse(code, name, shift, day, period);
        }

        return courseRepository.findCoursesOfSubjectByName(name);
    }

    public Course getCourseByIdentifier(String identifier) {
        return courseRepository.findCourseByIdentifier(identifier);
    }

    public List<Course> getCoursesOfUser(String username) {
        return courseRepository.findCoursesOfUser(username);
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
        UsersOfCourseQueryResult course = courseRepository.findUsersOfCourse(courseCode);
        if (course == null) {
            return null;
        }
        return course.toCourseDTO();
    }

    public CourseDTO addUserToCourse(String username, String courseCode) {
        courseRepository.addUserToCourse(username, courseCode);

        return getUsersOfCourse(courseCode);
    }

    public List<Course> addUserToCourses(String username, List<String> courseCodes) {
        courseRepository.addUserToCourses(username, courseCodes);

        List<Course> courses = courseRepository.findCoursesOfUser(username);

        return courses;
    }

    public boolean setUserAvailabilityInCourse(String username, String courseCode, boolean available) {
        return courseRepository.setUserAvailabilityInCourse(username, courseCode, available);
    }

    public CourseDTO removeUserFromCourse(String username, String courseCode) {
        courseRepository.removeUserFromCourse(username, courseCode);

        return getUsersOfCourse(courseCode);
    }

    public boolean getUserAvailabilityInCourse(String name, String courseCode) {
        return courseRepository.getUserAvailabilityInCourse(name, courseCode);
    }
}
