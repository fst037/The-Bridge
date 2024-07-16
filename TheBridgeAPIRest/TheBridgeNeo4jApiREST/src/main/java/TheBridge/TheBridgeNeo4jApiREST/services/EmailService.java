package TheBridge.TheBridgeNeo4jApiREST.services;

import TheBridge.TheBridgeNeo4jApiREST.models.Course;
import TheBridge.TheBridgeNeo4jApiREST.models.Team;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.TeamSkillsDTO;
import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void inviteToJoinTeam(TeamSkillsDTO teamMembers, String messageText, Course course, TeamDTO team, UserDTO sender) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String[] to = teamMembers.getMembers().stream().map(UserDTO::getUsername).toArray(String[]::new);

        helper.setTo(to[0]); // El primer destinatario en el campo "To"
        if (to.length > 1) {
            String[] cc = new String[to.length - 1];
            System.arraycopy(to, 1, cc, 0, to.length - 1);
            helper.setCc(cc); // El resto en el campo "CC"
        }

        List<UserDTO> newMembers = new ArrayList<UserDTO>();

        for (UserDTO member : teamMembers.getMembers()) {
            if (team.getEstudiantes().stream().map(UserDTO::getUsername).noneMatch(username -> username.equals(member.getUsername()))) {
                newMembers.add(member);
            }
        }

        helper.setSubject("Invitación a unirse al equipo \"" + team.getTeam().getNombre() + "\" en Bridge.com");

        String body = "<p>" + sender.getName() + " te ha invitado a unirte al equipo " + team.getTeam().getNombre() + " en Bridge. </p>" +
                "<p> Mensaje: <br>" + messageText + "</p>" +
                "<p> Curso: " + course.getName() + " - " + course.getCode() + " - " + course.getShift() + " - " + course.getDay() + " - " + course.getPeriod() + "</p>" +
                "<p> Miembros actuales del equipo: <br>" +
                team.getEstudiantes().stream().map(user -> "<a href='http://localhost:5173/perfil/" + user.getUsername() + "'> - " + user.getName() + "</a>").collect(Collectors.joining("<br>")) + "</p>" +
                "<p> Miembros que fueron invitados: <br>" +
                newMembers.stream().map(user -> "<a href='http://localhost:5173/perfil/" + user.getUsername() + "'> - " + user.getName() + "</a>").collect(Collectors.joining("<br>")) + "</p>" +
                "<p> Compatibilidad total del equipo: " + String.format("%.2f", teamMembers.getCompatibility()*100) + "%</p>" +
                "<p> Habilidades del equipo: <br> - " +
                teamMembers.getSkills().entrySet().stream().map(e -> e.getKey() + ": " + e.getValue()).collect(Collectors.joining("<br> - ")) + "</p>" +
                "<p> Para ponerte en contacto con el equipo, puedes \"Responder a todos\" en este mismo mail, o visitar cualquier perfil de los mencionados haciendo click en el nombre. </p>" +
                "<p> Si ya tienes equipo y/o deseas no recibir mas invitaciones para el curso mencionado, puedes marcarte como \"No Disponible\" en la plataforma Bridge.com haciendo " +
                "<a href='http://localhost:5173/curso/" + course.getCode() + "'>CLICK AQUI</a>" +
                "</p>";

        helper.setText(body, true);

        mailSender.send(message);
    }

    public void inviteToCreateTeam (TeamSkillsDTO teamMembers, String messageText, Course course, UserDTO sender) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String[] to = teamMembers.getMembers().stream().map(UserDTO::getUsername).toArray(String[]::new);

        helper.setTo(to[0]); // El primer destinatario en el campo "To"
        if (to.length > 1) {
            String[] cc = new String[to.length - 1];
            System.arraycopy(to, 1, cc, 0, to.length - 1);
            helper.setCc(cc); // El resto en el campo "CC"
        }

        helper.setSubject("Invitación a crear un equipo en Bridge.com");

        String body = "<p>" + sender.getName() + " te ha invitado a crear un equipo en Bridge. </p>" +
                "<p> Mensaje: <br>" + messageText + "</p>" +
                "<p> Curso: " + course.getName() + " - " + course.getCode() + " - " + course.getShift() + " - " + course.getDay() + " - " + course.getPeriod() + "</p>" +
                "<p> Miembros que fueron invitados: <br>" +
                teamMembers.getMembers().stream().map(user -> "<a href='http://localhost:5173/perfil/" + user.getUsername() + "'> - " + user.getName() + "</a>").collect(Collectors.joining("<br>")) + "</p>" +
                "<p> Compatibilidad total del equipo: " + String.format("%.2f", teamMembers.getCompatibility()*100) + "%</p>" +
                "<p> Habilidades del equipo: <br> - " +
                teamMembers.getSkills().entrySet().stream().map(e -> e.getKey() + ": " + e.getValue()).collect(Collectors.joining("<br> - ")) + "</p>" +
                "<p> Para ponerte en contacto con el equipo, puedes \"Responder a todos\" en este mismo mail, o visitar cualquier perfil de los mencionados haciendo click en el nombre. </p>" +
                "<p> Si ya tienes equipo y/o deseas no recibir mas invitaciones para el curso mencionado, puedes marcarte como \"No Disponible\" en la plataforma Bridge.com haciendo " +
                "<a href='http://localhost:5173/curso/" + course.getCode() + "'>CLICK AQUI</a>" +
                "</p>";

        helper.setText(body, true);

        mailSender.send(message);

    }

    public void inviteToCreateAccountBridge(String remitente, String destinatario) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(destinatario);

        helper.setSubject("Invitación a registrarte en Bridge.com");

        String body = "<p>" + remitente + " te ha invitado a registrarte en Bridge. </p>" +
                "<p> Para registrarte, puedes hacer click en el siguiente enlace: " +
                "<a href='http://localhost:5173/register'>Registrarse</a></p>";

        helper.setText(body, true);

        mailSender.send(message);
    }
}
