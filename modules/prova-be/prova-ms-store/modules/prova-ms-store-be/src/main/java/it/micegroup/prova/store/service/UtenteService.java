package it.micegroup.prova.store.service;

import it.micegroup.prova.store.domain.Utente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface UtenteService extends BaseEntityService<Utente, Integer> {

	// PARENT-SPECIFIC SERVICES

	Utente bulkUpdate(Utente utente);

	Utente update(Utente utente);

	Optional<Utente> delete(String objectKey);

	Page<Utente> search(Specification<Utente> specification, Pageable pageable);

}
