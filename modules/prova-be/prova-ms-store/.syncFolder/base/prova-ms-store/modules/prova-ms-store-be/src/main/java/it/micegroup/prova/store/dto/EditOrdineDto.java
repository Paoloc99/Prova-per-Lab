package it.micegroup.prova.store.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;
import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Ordine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 2887778539L;

	@NotNull
	private Integer ordineId;

	private LocalDate date;

	private Integer totalCost;

	@Size(max = 80)
	private String address;

	@NotNull
	private String theUtenteObjectKey;

	private Collection<EditOrderItemDto> theOrderItem;
}
