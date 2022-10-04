/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package it.uniroma1.jmsstockmarketservant;

import javax.jms.*;
import javax.naming.*;

import java.util.*;
import java.util.logging.Logger;
import org.slf4j.LoggerFactory;

public class NotificatoreAcquisto {

	final String titoli[] = { "Telecom", "Finmeccanica", "Banca_Intesa", "Oracle", "Parmalat", "Mondadori", "Vodafone",
			"Barilla" };

	private String scegliTitolo() {
		int whichMsg;
		Random randomGen = new Random();

		whichMsg = randomGen.nextInt(this.titoli.length);
		return this.titoli[whichMsg];
	}

	private float valore() {
		Random randomGen = new Random();
		float val = randomGen.nextFloat() * this.titoli.length * 10;
		return val;
	}

	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(NotificatoreAcquisto.class);

	public void start() throws NamingException, JMSException, InterruptedException {

		Context jndiContext = null;
		ConnectionFactory connectionFactory = null;
		Connection connection = null;
		Session session = null;
		Destination destination = null;
		MessageProducer producer = null;
		String destinationName = "dynamicTopics/Quotazioni";

		/*
		 * Create a JNDI API InitialContext object
		 */

		try {

			Properties props = new Properties();

			props.setProperty(Context.INITIAL_CONTEXT_FACTORY,
					"org.apache.activemq.jndi.ActiveMQInitialContextFactory");
			props.setProperty(Context.PROVIDER_URL, "tcp://localhost:61616");
			jndiContext = new InitialContext(props);

		} catch (NamingException e) {
			LOG.info("ERROR in JNDI: " + e.toString());
			System.exit(1);
		}

		/*
		 * Look up connection factory and destination.
		 */
		try {
			connectionFactory = (ConnectionFactory) jndiContext.lookup("ConnectionFactory");
			destination = (Destination) jndiContext.lookup(destinationName);
		} catch (NamingException e) {
			LOG.info("JNDI API lookup failed: " + e);
			System.exit(1);
		}

		/*
		 * Create connection. Create session from connection; false means session is not
		 * transacted. Create sender and text message. Send messages, varying text
		 * slightly. Send end-of-messages message. Finally, close connection.
		 */
		try {
			connection = connectionFactory.createConnection();
			session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			producer = session.createProducer(destination);

			TextMessage message = null;
			String messageType = null;

			message = session.createTextMessage();

			float quotazione;
			int i = 0;
			while (true) {
				Thread.sleep(5000);
				Integer quantita = 50;
				try {
					
				message.setIntProperty("Quantita",quantita);
					LOG.info("Invio quantita");

					producer.send(message);
				} catch (Exception err) {
					err.printStackTrace();
				}
			}
		}

		catch (JMSException e) {
			LOG.error("Exception occurred: " + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (JMSException e) {
				}
			}
		}
	}

}
