package it.micegroup.prova.store.config;

import it.micegroup.prova.store.actuator.ProvaMsStoreInterceptor;
import it.micegroup.prova.store.actuator.ProvaMsStoreProperties;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.handler.MappedInterceptor;

@EnableConfigurationProperties(ProvaMsStoreProperties.class)
@Configuration
public class ProvaMsStoreConfig {
	@Bean
	public MappedInterceptor metricInterceptor(MeterRegistry registry) {
		return new MappedInterceptor(new String[] { "/**" }, new ProvaMsStoreInterceptor(registry));
	}
}
