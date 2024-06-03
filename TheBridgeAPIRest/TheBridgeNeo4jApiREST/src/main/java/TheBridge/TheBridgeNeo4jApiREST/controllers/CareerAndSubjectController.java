package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.Career;
import TheBridge.TheBridgeNeo4jApiREST.models.Subject;
import TheBridge.TheBridgeNeo4jApiREST.queryresults.SubjectsOfCareerQueryResult;
import TheBridge.TheBridgeNeo4jApiREST.services.CareerAndSubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carreras-materias")
public class CareerAndSubjectController {

    private final CareerAndSubjectService careerAndSubjectService;

    public CareerAndSubjectController(CareerAndSubjectService careerAndSubjectService) {
        this.careerAndSubjectService = careerAndSubjectService;
    }

    @GetMapping("/todasLasCarreras")
    public ResponseEntity<List<Career>> todasLasCarreras() {
        List<Career> carreras = careerAndSubjectService.getAllCareers();

        return new ResponseEntity<>(carreras, HttpStatus.OK);
    }

    @GetMapping("/todasLasMaterias")
    public ResponseEntity<List<Subject>> todasLasMaterias() {
        List<Subject> materias = careerAndSubjectService.getAllSubjects();

        return new ResponseEntity<>(materias, HttpStatus.OK);
    }

    @GetMapping("/materiasDeCarrera")
    public ResponseEntity<SubjectsOfCareerQueryResult> materiasDeCarrera(@RequestParam String codigoCarrera) {
        SubjectsOfCareerQueryResult result = careerAndSubjectService.getSubjectsOfCareer(codigoCarrera);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/crearCarrera")
    public ResponseEntity<Career> crearCarrera(@RequestParam String nombre, @RequestParam String codigo, @RequestParam String facultad) {
        Career carrera = careerAndSubjectService.createCareer(nombre, codigo, facultad);

        return new ResponseEntity<>(carrera, HttpStatus.CREATED);
    }

    @PostMapping("/crearMateria")
    public ResponseEntity<Subject> crearMateria(@RequestParam String nombre, @RequestParam String codigo) {
        Subject materia = careerAndSubjectService.createSubject(nombre, codigo);

        return new ResponseEntity<>(materia, HttpStatus.CREATED);
    }

    @PostMapping("/agregarMateriaACarrera")
    public ResponseEntity<SubjectsOfCareerQueryResult> agregarMateriaACarrera(@RequestParam String codigoMateria, @RequestParam String codigoCarrera) {
        SubjectsOfCareerQueryResult result = careerAndSubjectService.addSubjectToCareer(codigoMateria, codigoCarrera);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping ("/quitarMateriaACarrera")
    public ResponseEntity<SubjectsOfCareerQueryResult> quitarMateriaACarrera(@RequestParam String codigoMateria, @RequestParam String codigoCarrera) {
        SubjectsOfCareerQueryResult result = careerAndSubjectService.removeSubjectFromCareer(codigoMateria, codigoCarrera);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
