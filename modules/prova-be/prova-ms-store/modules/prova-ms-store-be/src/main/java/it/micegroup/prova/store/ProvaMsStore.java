package it.micegroup.prova.store;

import javax.jms.JMSException;
import javax.naming.NamingException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import it.micegroup.prova.store.jms.FromDatabaseJMSListener;
import it.micegroup.prova.store.jms.ToDatabaseJMSProducer;

@SpringBootApplication
@ComponentScan({ "it.micegroup.prova", "it.micegroup.voila2runtime" })
public class ProvaMsStore {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(ProvaMsStore.class, args);
		FromDatabaseJMSListener listenerFromDatabase = new FromDatabaseJMSListener();
		listenerFromDatabase.start();
		ToDatabaseJMSProducer producerToDatabase = new ToDatabaseJMSProducer();
		producerToDatabase.start();
		
	}
}
