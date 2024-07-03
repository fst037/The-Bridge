package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import TheBridge.TheBridgeNeo4jApiREST.models.User;

import java.util.List;

public class CourseWithSubjectDTO extends CourseDTO{

        private Subject subject;

        public CourseWithSubjectDTO(String name, String code, String shift, String day, String period, List<UserDTO> users, Subject subject) {
            super(name, code, shift, day, period, users);
            this.subject = subject;
        }

        public Subject getSubject() {
            return subject;
        }

        public void setSubject(Subject subject) {
            this.subject = subject;
        }
}
