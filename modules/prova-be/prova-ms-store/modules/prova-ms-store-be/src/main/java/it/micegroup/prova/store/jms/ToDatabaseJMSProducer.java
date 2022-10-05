/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package it.micegroup.prova.store.jms;

import javax.jms.*;
import javax.naming.*;

import java.util.*;
import java.util.logging.Logger;
import org.slf4j.LoggerFactory;

public class ToDatabaseJMSProducer {

	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(ToDatabaseJMSProducer.class);

	Context jndiContext = null;
	ConnectionFactory connectionFactory = null;
	Connection connection = null;
	Session session = null;
	Destination destination = null;
	MessageProducer producer = null;
	String destinationName = "dynamicTopics/StoreToDatabase";

	public void start() throws NamingException, JMSException, InterruptedException {
		try {
			Properties props = new Properties();

			props.setProperty(Context.INITIAL_CONTEXT_FACTORY,
					"org.apache.activemq.jndi.ActiveMQInitialContextFactory");
			props.setProperty(Context.PROVIDER_URL, "tcp://localhost:61616");
			jndiContext = new InitialContext(props);

			connectionFactory = (ConnectionFactory) jndiContext.lookup("ConnectionFactory");
			destination = (Destination) jndiContext.lookup(destinationName);
			connection = connectionFactory.createConnection();
			session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

			producer = session.createProducer(destination);
			
			sendInfoProdottoRequest(1);
			sendPurchasedProductNotification(1,1);
		} catch (NamingException e) {
			LOG.info("ERROR in JNDI: " + e.toString());
			System.exit(1);
		}
	}

	public void sendInfoProdottoRequest(Integer productId) {
		try {
			TextMessage message = session.createTextMessage();

			message.setStringProperty("State", "ProductInfo");
			message.setIntProperty("ProductId", productId);
			LOG.info("Send product info request to Database... Product id: " + productId);
			try {
				producer.send(message);
			} catch (Exception err) {
				err.printStackTrace();
			}
		} catch (JMSException e) {
			LOG.error("Exception occurred: " + e);
		}
	}
	
	public void sendPurchasedProductNotification(Integer productId, Integer amount) {
		try {
			TextMessage message = session.createTextMessage();

			message.setStringProperty("State", "PurchasedProduct");
			message.setIntProperty("ProductId", productId);
			message.setIntProperty("Amount", amount);
			LOG.info("Send purchased product notification to Database... Product id and amount: " + productId + ", " + amount);
			try {
				producer.send(message);
			} catch (Exception err) {
				err.printStackTrace();
			}
		} catch (JMSException e) {
			LOG.error("Exception occurred: " + e);
		}
	}
}
