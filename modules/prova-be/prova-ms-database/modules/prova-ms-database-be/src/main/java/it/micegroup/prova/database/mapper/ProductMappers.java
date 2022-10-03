package it.micegroup.prova.database.mapper;

import it.micegroup.prova.database.dto.EditProductDto;
import it.micegroup.prova.database.dto.ViewProductDto;
import it.micegroup.prova.database.domain.Product;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;
import java.util.Optional;

@Mapper
public interface ProductMappers {

	@Mappings({ @Mapping(source = "entityState", target = "entityState") })
	Product map(EditProductDto productDto);

	ViewProductDto map(Product product);

	default Page<ViewProductDto> map(Page<Product> page) {
		return page.map(this::map);
	}

	default Optional<ViewProductDto> map(Optional<Product> read) {
		return read.map(this::map);
	}
}
