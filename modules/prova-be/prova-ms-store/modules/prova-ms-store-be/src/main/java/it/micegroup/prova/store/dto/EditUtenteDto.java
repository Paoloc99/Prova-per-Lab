package it.micegroup.prova.store.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Utente
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditUtenteDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 380747819L;

	@NotNull
	private Integer utenteId;

	@Size(max = 80)
	private String name;

	@Size(max = 80)
	private String surname;

	@Size(max = 80)
	private String email;

	private Integer oauthId;

	private Boolean isAdmin;

	private Collection<EditOrdineDto> theOrdine;
}
