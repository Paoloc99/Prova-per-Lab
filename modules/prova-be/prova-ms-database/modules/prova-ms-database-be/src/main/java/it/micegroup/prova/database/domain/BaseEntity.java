package it.micegroup.prova.database.domain;

import it.micegroup.prova.commons.utilities.Constants;
import it.micegroup.voila2runtime.entity.GenericEntity;

/**
 * Generic class for entities
 *
 */
public abstract class BaseEntity extends GenericEntity {

	protected static String getRowIdFieldDelimiter() {
		return Constants.ROWIDFIELDDELIMITER;
	}
}
