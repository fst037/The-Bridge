package dev.farhan.springneo4j.services;

import dev.farhan.springneo4j.models.Equipo;
import dev.farhan.springneo4j.repositories.EquipoRepository;

import java.util.List;
import java.util.Optional;

public class EquipoService {

    private final EquipoRepository equipoReposiory;

    public EquipoService(EquipoRepository equipoReposiory) {
        this.equipoReposiory = equipoReposiory;
    }

    public List<Equipo> getAllEquipos() {
        return equipoReposiory.findAll();
    }

    public Optional<Equipo> getEquipoByIdentifier(String identifier) {
        return equipoReposiory.findEquipoByIdentifier(identifier);
    }

    public List<Equipo> getEquiposByEstudiante(String username) {
        return equipoReposiory.findEquipoByEstudiante(username);
    }

}

