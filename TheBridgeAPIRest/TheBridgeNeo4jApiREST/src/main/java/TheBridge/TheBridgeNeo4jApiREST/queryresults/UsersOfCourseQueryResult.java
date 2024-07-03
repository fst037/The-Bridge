package TheBridge.TheBridgeNeo4jApiREST.queryresults;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.CourseDTO;

import java.util.List;

public class UsersOfCourseQueryResult {

    private Course course;
    private List<User> users;

    public UsersOfCourseQueryResult(Course course, List<User> users) {
        this.course = course;
        this.users = users;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public CourseDTO toCourseDTO() {
        return new CourseDTO(course.getName(),course.getCode(), course.getShift(), course.getDay(), course.getPeriod(), users.stream().map(User::toUserDTO).toList());
    }
}
