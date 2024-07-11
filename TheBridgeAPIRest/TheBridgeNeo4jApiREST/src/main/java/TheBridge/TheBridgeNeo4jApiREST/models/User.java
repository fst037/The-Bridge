package TheBridge.TheBridgeNeo4jApiREST.models;

import TheBridge.TheBridgeNeo4jApiREST.objects.UserDTO;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Node
public class User implements UserDetails {

    @Id @GeneratedValue(GeneratedValue.UUIDGenerator.class)
    private UUID id;
    private String name;
    private String legajo;
    private String username;
    private String password;
    private String introduction;
    private List<String> contactLinks;
    private String roles;
    private boolean enabled;

    public User() {
    }

    public String getName() {
        return name;
    }
    public String getLegajo() {
        return legajo;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public String getPassword() {
        return password;
    }
    public String getIntroduction() {
        return introduction;
    }
    public List<String> getContactLinks() {
        return contactLinks;
    }
    public String getRoles() {
        return roles;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setName(String nombre) {
        this.name = nombre;
    }
    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
    public void setUsername(String email) {
        this.username = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
    public void setContactLinks(List<String> contactLinks) {
        this.contactLinks = contactLinks;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", roles='" + roles + '\'' +
                '}';
    }

    public UserDTO toUserDTO(){
        return new UserDTO(this.name, this.username, this.legajo);
    }

}
