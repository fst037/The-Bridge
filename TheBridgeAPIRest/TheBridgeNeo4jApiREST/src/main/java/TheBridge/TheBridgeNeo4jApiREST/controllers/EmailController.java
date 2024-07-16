package TheBridge.TheBridgeNeo4jApiREST.controllers;
import TheBridge.TheBridgeNeo4jApiREST.requests.SendMailTeamCreateRequest;
import TheBridge.TheBridgeNeo4jApiREST.requests.SendMailTeamJoinRequest;
import TheBridge.TheBridgeNeo4jApiREST.services.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendSimpleMessage")
    public void sendSimpleMessage(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        emailService.sendSimpleMessage(to, subject, text);
    }

    @PostMapping("/emailInviteToJoinTeam")
    public void emailInviteToJoinTeam(@RequestBody SendMailTeamJoinRequest emailRequest) {
        try {
            emailService.inviteToJoinTeam(emailRequest.getTeamMembers(), emailRequest.getMessageText(), emailRequest.getCourse(), emailRequest.getTeam(), emailRequest.getSender());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/emailInviteToCreateTeam")
    public void emailInviteToCreateTeam(@RequestBody SendMailTeamCreateRequest emailRequest) {
        try {
            emailService.inviteToCreateTeam(emailRequest.getTeamMembers(), emailRequest.getMessageText(), emailRequest.getCourse(), emailRequest.getSender());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/emailInviteToCreateAccountBridge")
    public void emailInviteToCreateAccountBridge(Principal principal, @RequestParam String to) throws MessagingException {
        emailService.inviteToCreateAccountBridge(principal.getName(), to);
    }
}
