package it.micegroup.prova.store.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Collection;

import org.springframework.data.jpa.repository.Query;
import it.micegroup.prova.store.domain.Utente;

@Repository
public interface UtenteRepository extends BaseRepository<Utente, Integer>, JpaSpecificationExecutor<Utente> {

	Optional<Utente> findByUtenteId(Integer id);

	@Query("DELETE FROM Utente WHERE utenteId IN ?1")
	void deleteByIdIn(Collection<Integer> ids);
}
