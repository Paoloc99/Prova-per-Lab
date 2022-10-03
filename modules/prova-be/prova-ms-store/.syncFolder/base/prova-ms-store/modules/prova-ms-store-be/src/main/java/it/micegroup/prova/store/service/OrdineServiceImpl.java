package it.micegroup.prova.store.service;

import java.util.List;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import org.springframework.stereotype.Service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import it.micegroup.prova.store.domain.Ordine;

import it.micegroup.prova.store.domain.Utente;

import it.micegroup.prova.store.repository.OrdineRepository;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.prova.store.domain.OrderItem;
import it.micegroup.voila2runtime.entity.GenericEntity;
import it.micegroup.voila2runtime.utils.AclUtils;

@RequiredArgsConstructor
@Service
public class OrdineServiceImpl extends BaseServiceImpl implements OrdineService {

	private final OrdineRepository ordineRepository;
	// CHILD SERVICES
	private final OrderItemService orderItemService;

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LogManager.getLogger(OrdineServiceImpl.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#findAll(org.
	 * springframework.data.domain.Pageable)
	 */
	@Override
	public Page<Ordine> findAll(Pageable pageable) {
		return ordineRepository.findAll(pageable);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#findAll()
	 */
	@Override
	public List<Ordine> findAll() {
		return ordineRepository.findAll();
	}

	@Override
	public Optional<Ordine> findByObjectKey(String objectKey) {
		Ordine ordine = new Ordine(objectKey);
		return ordineRepository.findByOrdineId(ordine.getOrdineId());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#exists(java.lang.
	 * Object)
	 */
	@Override
	public boolean exists(Integer id) {
		return ordineRepository.existsById(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#insert(java.
	 * lang.Object)
	 */
	@Override
	public Ordine insert(@Valid Ordine entity) {
		return ordineRepository.save(entity);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#update(java.
	 * lang.Object)
	 */
	@Override
	public Ordine update(@Valid Ordine entity) {
		return ordineRepository.save(entity);
	}

	@Override
	public Optional<Ordine> delete(String objectKey) {
		return findByObjectKey(objectKey).map(ordine -> {
			ordineRepository.delete(ordine);
			return Optional.of(ordine);
		}).orElseGet(Optional::empty);
	}

	@Override
	public Page<Ordine> search(Specification<Ordine> specification, Pageable pageable) {
		specification = AclUtils.applyAcl(specification, "ordine.search");
		return ordineRepository.findAll(specification, pageable);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * it.micegroup.prova.store.service.GenericEntityService#deleteById(java.lang.
	 * Object)
	 */
	@Override
	public void deleteById(Integer id) {
		ordineRepository.deleteById(id);
	}

	@Override
	public Ordine bulkUpdate(Ordine ordine) {
		if (ordine.getTheOrderItem() != null) {
			List<OrderItem> updateTheOrderItem = ordine.getTheOrderItem().stream()
					.filter(child -> !child.isDeletedEntityState()).collect(Collectors.toList());
			List<OrderItem> deleteTheOrderItem = ordine.getTheOrderItem().stream()
					.filter(GenericEntity::isDeletedEntityState).collect(Collectors.toList());
			ordine.setTheOrderItem(updateTheOrderItem);
			deleteTheOrderItem.forEach(child -> orderItemService.deleteById(child.getTheOrderItemKey()));
		}
		Ordine update = this.update(ordine);
		return update;
	}

	@Override
	public Page<Ordine> findByTheUtente(Utente parentEntity, Pageable pageable) {
		return ordineRepository.findByTheUtente(parentEntity, pageable);
	}

}
