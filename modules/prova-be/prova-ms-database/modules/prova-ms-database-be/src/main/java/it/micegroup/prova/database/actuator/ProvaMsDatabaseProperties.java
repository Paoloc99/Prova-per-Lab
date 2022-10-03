package it.micegroup.prova.database.actuator;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "provamsdatabase")
public class ProvaMsDatabaseProperties {
	private String path;
}
