package it.micegroup.prova.store.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

/**
 * Data transfer object for view a data element of type Utente
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewUtenteDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 380747819L;

	private String objectKey;
	private String objectTitle;

	private Integer utenteId;

	private String name;

	private String surname;

	private String email;

	private Integer oauthId;

	private Boolean isAdmin;

}
