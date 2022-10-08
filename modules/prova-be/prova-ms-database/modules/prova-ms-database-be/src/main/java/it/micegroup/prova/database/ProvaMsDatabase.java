package it.micegroup.prova.database;

import javax.jms.JMSException;
import javax.naming.NamingException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import it.micegroup.prova.database.jms.FromGatewayJMSListener;
import it.micegroup.prova.database.jms.FromStoreJMSListener;
import it.micegroup.prova.database.jms.MessaggisticaDbJms;

@SpringBootApplication
@ComponentScan({ "it.micegroup.prova", "it.micegroup.voila2runtime" })
public class ProvaMsDatabase {
	public static void main(String[] args) throws NamingException, JMSException, InterruptedException {
		SpringApplication.run(ProvaMsDatabase.class, args);
		FromStoreJMSListener listenerStore = new FromStoreJMSListener();
		FromGatewayJMSListener listenerGateway = new FromGatewayJMSListener();
		listenerStore.start();
		listenerGateway.start();
	}
}
