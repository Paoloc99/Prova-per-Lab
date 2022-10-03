package it.micegroup.prova.commons.security;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JPAAuditConfig {

	@Bean
	public AuditorAware<String> auditorProvider() {
		return new AuditorAware<String>() {
			@Override
			public Optional<String> getCurrentAuditor() {
				Authentication auth = SecurityContextHolder.getContext().getAuthentication();
				if (auth != null && auth.getPrincipal() != null) {
					Object principal = auth.getPrincipal();
					if (!principal.equals("anonymousUser")) {
						Jwt token = (Jwt) principal;
						String subscriber = (String) token.getClaims().get("sub");
						return Optional.of(subscriber);
					}
				}
				return Optional.of("Unknown");
			}
		};
	}
}
