package it.micegroup.prova.store.mapper;

import it.micegroup.prova.store.dto.EditOrderItemDto;
import it.micegroup.prova.store.dto.ViewOrderItemDto;
import it.micegroup.prova.store.domain.OrderItem;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;
import java.util.Optional;

@Mapper
public interface OrderItemMappers {

	@Mappings({ @Mapping(source = "entityState", target = "entityState") })
	OrderItem map(EditOrderItemDto orderItemDto);

	ViewOrderItemDto map(OrderItem orderItem);

	default Page<ViewOrderItemDto> map(Page<OrderItem> page) {
		return page.map(this::map);
	}

	default Optional<ViewOrderItemDto> map(Optional<OrderItem> read) {
		return read.map(this::map);
	}
}
