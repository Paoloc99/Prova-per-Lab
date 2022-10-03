package it.micegroup.prova.store.service;

import it.micegroup.prova.store.domain.Ordine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.prova.store.domain.Utente;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface OrdineService extends BaseEntityService<Ordine, Integer> {

	// PARENT-SPECIFIC SERVICES
	Page<Ordine> findByTheUtente(Utente parentEntity, Pageable pageable);

	Ordine bulkUpdate(Ordine ordine);

	Ordine update(Ordine ordine);

	Optional<Ordine> delete(String objectKey);

	Page<Ordine> search(Specification<Ordine> specification, Pageable pageable);

}
