package TheBridge.TheBridgeNeo4jApiREST.models;

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
    private String roles;
    private boolean enabled;
    @Relationship(type = "COMENTO_A", direction = Relationship.Direction.OUTGOING)
    private List<Comentario> comentariosRealizados;
    @Relationship(type = "VALORO_A", direction = Relationship.Direction.OUTGOING)
    private List<Valoracion> valoracionesRealizados;

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
    public void setRoles(String roles) {
        this.roles = roles;
    }

    public List<Comentario> getComentarios() {
        return comentariosRealizados;
    }

    public void comentarPerfilCompañero(Comentario comentario) {
        if (comentariosRealizados == null) {
            comentariosRealizados = new ArrayList<>();
        }
        comentariosRealizados.add(comentario);
    }

    public List<Valoracion> getValoraciones() {
        return valoracionesRealizados;
    }

    public void valorarPerfilCompañero(Valoracion valoracion) {
        if (valoracionesRealizados == null) {
            valoracionesRealizados = new ArrayList<>();
        }
        valoracionesRealizados.add(valoracion);
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
}
