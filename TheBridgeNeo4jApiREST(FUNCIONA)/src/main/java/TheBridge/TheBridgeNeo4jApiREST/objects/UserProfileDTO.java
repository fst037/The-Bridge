package TheBridge.TheBridgeNeo4jApiREST.objects;

import TheBridge.TheBridgeNeo4jApiREST.models.Comentario;
import TheBridge.TheBridgeNeo4jApiREST.models.Valoracion;

import java.util.HashMap;
import java.util.List;

public class UserProfileDTO extends UserDTO{

    private List<Comentario> comentarios;
    private HashMap<String, Integer> valoracionesHashMap;

    public UserProfileDTO(String name, String username, String roles, List<Comentario> comentarios, List<Valoracion> valoraciones) {
        super(name, username, roles);
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
