package TheBridge.TheBridgeNeo4jApiREST.controllers;

import TheBridge.TheBridgeNeo4jApiREST.models.User;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import TheBridge.TheBridgeNeo4jApiREST.requests.CreateUserRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String loggedInUser(Principal principal) {
        return principal.getName();
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);

        UserDTO responseUser = new UserDTO(user.getName(),user.getUsername(),user.getLegajo());

        return new ResponseEntity<>(responseUser, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> signUp(@RequestBody CreateUserRequest request) {
        User estudiante = userService.createUser(request);

        if (estudiante == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        UserDTO responseUser = new UserDTO(estudiante.getName(),estudiante.getUsername(),estudiante.getRoles());

        return new ResponseEntity<>(responseUser, HttpStatus.CREATED);
    }

    @PostMapping("/preRegisterUsers")
    public ResponseEntity<String> preCreateUser(@RequestBody List<CreateUserRequest> requests) {
        int i = 0;
        for (CreateUserRequest request : requests) {
            i = i + userService.preCreateUser(request);
        }

        return new ResponseEntity<String>("Usuarios precargados: "+ i, HttpStatus.CREATED);
    }
}
