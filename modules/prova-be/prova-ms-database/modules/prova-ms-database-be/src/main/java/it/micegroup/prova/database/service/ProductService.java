package it.micegroup.prova.database.service;

import it.micegroup.prova.database.domain.Product;
import it.micegroup.prova.database.dto.ViewProductDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface ProductService extends BaseEntityService<Product, Integer> {

	// PARENT-SPECIFIC SERVICES

	Product bulkUpdate(Product product);

	Product update(Product product);

	Optional<Product> delete(String objectKey);

	Page<Product> search(Specification<Product> specification, Pageable pageable);
	
	void sendInsertJms(Product product);
}
