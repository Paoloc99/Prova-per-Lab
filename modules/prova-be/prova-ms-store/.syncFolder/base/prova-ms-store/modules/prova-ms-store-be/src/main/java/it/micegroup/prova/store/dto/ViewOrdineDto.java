package it.micegroup.prova.store.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

/**
 * Data transfer object for view a data element of type Ordine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 2887778539L;

	private String objectKey;
	private String objectTitle;

	private Integer ordineId;

	private LocalDate date;

	private Integer totalCost;

	private String address;

	private String theUtenteObjectKey;

	private String theUtenteObjectTitle;
}
