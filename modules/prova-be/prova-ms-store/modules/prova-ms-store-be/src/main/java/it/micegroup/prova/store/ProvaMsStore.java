package it.micegroup.prova.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import it.micegroup.prova.store.jms.AzioniJMSListener;

@SpringBootApplication
@ComponentScan({ "it.micegroup.prova", "it.micegroup.voila2runtime" })
public class ProvaMsStore {
	public static void main(String[] args) {
		SpringApplication.run(ProvaMsStore.class, args);
		AzioniJMSListener aJMSL = new AzioniJMSListener();
		aJMSL.start();
	}
}
