/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package it.micegroup.prova.database.jms;

import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.slf4j.LoggerFactory;

import it.micegroup.prova.database.domain.Product;

public class MessaggisticaDbJms {

	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(MessaggisticaDbJms.class);

	public void sendInsert(Product product) throws NamingException, JMSException, InterruptedException {

		Context jndiContext = null;
		ConnectionFactory connectionFactory = null;
		Connection connection = null;
		Session session = null;
		Destination destination = null;
		MessageProducer producer = null;
		String destinationName = "StockTOStore";

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
			message = session.createTextMessage();
			Integer idProdotto = product.getProductId();
			String comando = "NewProdotto";
			try {
				message.setStringProperty("Command", comando);
				message.setIntProperty("IdProdotto", idProdotto);
				LOG.info("Invio idProdotto: " + idProdotto);

				producer.send(message);
			} catch (Exception err) {
				err.printStackTrace();
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

//	private Integer rmID() {
//		Random randomGen = new Random();
//		Integer val = randomGen.nextInt();
//		return val;
//	}

}
