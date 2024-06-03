package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Professor;
import TheBridge.TheBridgeNeo4jApiREST.repositories.ProfessorRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Provider;
import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public List<Professor> getAllProfessors(){
        return professorRepository.findAll();
    }

    public Professor getProfessorByEmail(String email) {
        return professorRepository.findProfessorByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }
}
