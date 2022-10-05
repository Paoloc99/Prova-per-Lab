package it.micegroup.prova.commons.security;

import java.util.Arrays;
import java.util.Collections;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
// @EnableGlobalMethodSecurity(jsr250Enabled = true, prePostEnabled = true)
// //Commentare questa per disattivare sicurezza da keycloak
public class ResourceServerSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
	private String jwkSetUri;
	private static final Logger LOGGER = LogManager.getLogger(ResourceServerSecurityConfig.class);

	@Override
	protected void configure(HttpSecurity http) {
//		enabledSecurity(http); // ABILITA LA SICUREZZA
		disabledSecurity(http);
	}

	private void enabledSecurity(HttpSecurity http) {
		try {
			http.csrf().disable().authorizeRequests(a -> {
				try {
					a.antMatchers("/h2-console/*").anonymous().anyRequest().permitAll().and().authorizeRequests()

							.anyRequest().authenticated();
				} catch (Exception e) {
					LOGGER.error("Error stack trace: ", e);
				}
			}).oauth2ResourceServer(
					httpSecurityOAuth2ResourceServerConfigurer -> httpSecurityOAuth2ResourceServerConfigurer.jwt(
							jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtAuthenticationConverter())));
			http.csrf().disable();
			http.headers().frameOptions().disable();
		} catch (Exception e) {
			LOGGER.error("Error stack trace: ", e);
		}
	}

	private void disabledSecurity(HttpSecurity http) {
		try {
			http.headers().frameOptions().sameOrigin().and().csrf().disable().authorizeRequests().anyRequest()
					.permitAll();
		} catch (Exception e) {
			LOGGER.error("Error stack trace: ", e);
		}
	}

	private Converter<Jwt, ? extends AbstractAuthenticationToken> jwtAuthenticationConverter() {
		JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
		jwtConverter.setJwtGrantedAuthoritiesConverter(new KeycloakRealmRoleConverter());
		return jwtConverter;
	}

	@Bean
	public JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.addAllowedHeader("*");
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
