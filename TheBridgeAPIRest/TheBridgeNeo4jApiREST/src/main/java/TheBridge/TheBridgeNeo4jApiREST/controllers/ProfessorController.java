package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Professor;
import TheBridge.TheBridgeNeo4jApiREST.objects.ProfessorDTO;
import TheBridge.TheBridgeNeo4jApiREST.services.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/professors")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping("/email/{identifier}")
    public ResponseEntity<ProfessorDTO> professorDetails(@PathVariable String identifier) {
        Professor professor = professorService.getProfessorByEmail(identifier);
        ProfessorDTO responseProfessor = new ProfessorDTO(professor.getNombre(),
                professor.getLegajo(),
                professor.getEmail());
        return new ResponseEntity<>(responseProfessor, HttpStatus.OK);
    }
}
