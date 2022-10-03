package it.micegroup.prova.store.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Product
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditProductDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3964889677L;

	@NotNull
	private Integer productId;

	private Collection<EditOrderItemDto> theOrderItem;
}
