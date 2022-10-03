package it.micegroup.prova.store.actuator;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "provamsstore")
public class ProvaMsStoreProperties {
	private String path;
}
