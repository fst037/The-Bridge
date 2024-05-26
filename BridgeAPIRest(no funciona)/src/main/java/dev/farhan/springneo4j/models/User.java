package dev.farhan.springneo4j.models;

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
    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private String legajo;
    private String email;
    private String password;
    private String roles;
    private boolean enabled;
    @Relationship(type = "COMENTO_A", direction = Relationship.Direction.INCOMING)
    private List<Comentario> comentariosRecibidos;
    @Relationship(type = "VALORO_A", direction = Relationship.Direction.INCOMING)
    private List<Valoracion> valoracionesRecibidas;

    public User() {
    }

    public Long getId() {
        return id;
    }
    public String getNombre() {
        return nombre;
    }
    public String getLegajo() {
        return legajo;
    }
    public String getEmail() {
        return email;
    }
    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }
    public String getRoles() {
        return roles;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Comentario> getComentarios() {
        return comentariosRecibidos;
    }

    public void recibeComentario(Comentario comentario) {
        if (comentariosRecibidos == null) {
            comentariosRecibidos = new ArrayList<>();
        }
        comentariosRecibidos.add(comentario);
    }

    public List<Valoracion> getValoraciones() {
        return valoracionesRecibidas;
    }

    public void recibeValoracion(Valoracion valoracion) {
        if (valoracionesRecibidas == null) {
            valoracionesRecibidas = new ArrayList<>();
        }
        valoracionesRecibidas.add(valoracion);
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
        return this.enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String toString() {
        return "Estudiante{" +
                "nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", roles='" + roles + '\'' +
                '}';
    }
}
