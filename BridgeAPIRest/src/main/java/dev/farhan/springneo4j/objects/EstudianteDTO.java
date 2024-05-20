package dev.farhan.springneo4j.objects;

import dev.farhan.springneo4j.models.Comentario;
import dev.farhan.springneo4j.models.Valoracion;

import java.util.HashMap;
import java.util.List;

public class EstudianteDTO {
    private String nombre;
    private String email;
    private String roles;
    private List<Comentario> comentarios;
    private HashMap<String, Integer> valoracionesHashMap;

    public EstudianteDTO(String name, String username, String roles, List<Comentario> comentarios, List<Valoracion> valoraciones) {
        this.nombre = name;
        this.email = username;
        this.roles = roles;
        this.comentarios = comentarios;
        this.valoracionesHashMap = new HashMap<String, Integer>();
        for (Valoracion valoracion : valoraciones) {
            if (valoracionesHashMap.containsKey(valoracion.getAptitud1())) {
                valoracionesHashMap.put(valoracion.getAptitud1(), valoracionesHashMap.get(valoracion.getAptitud1()) + 1);
            } else {
                valoracionesHashMap.put(valoracion.getAptitud1(), 1);
            }
        }
    }
    
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRoles() {
        return roles;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }
    public List<Comentario> getComentarios() {
        return comentarios;
    }
    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
    public HashMap<String, Integer> getValoraciones() {
        return valoracionesHashMap;
    }
    public void setValoraciones(HashMap<String, Integer> valoraciones) {
        this.valoracionesHashMap = valoraciones;
    }

    
}
