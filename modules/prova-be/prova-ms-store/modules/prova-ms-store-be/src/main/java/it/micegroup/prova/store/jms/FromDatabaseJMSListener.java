package it.micegroup.prova.store.jms;

import java.util.Observable;
import java.util.Properties;

import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.slf4j.LoggerFactory;

import it.micegroup.prova.store.domain.Product;
import it.micegroup.prova.store.service.ProductService;

public class FromDatabaseJMSListener implements MessageListener {
	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(FromDatabaseJMSListener.class);
	
	public ProductService productService;
	
	private TopicConnection topicConnection;
	private TopicSession topicSession = null;
	private Destination destination = null;
	private MessageProducer producer = null;

	public FromDatabaseJMSListener() {

		Context jndiContext = null;
		ConnectionFactory topicConnectionFactory = null;

		String destinationName = "dynamicTopics/DatabaseToStore";

		try {
			Properties props = new Properties();

			props.setProperty(Context.INITIAL_CONTEXT_FACTORY, "org.apache.activemq.jndi.ActiveMQInitialContextFactory");
			props.setProperty(Context.PROVIDER_URL, "tcp://localhost:61616");
			jndiContext = new InitialContext(props);

			topicConnectionFactory = (ConnectionFactory) jndiContext.lookup("ConnectionFactory");
			destination = (Destination) jndiContext.lookup(destinationName);
			topicConnection = (TopicConnection) topicConnectionFactory.createConnection();
			topicSession = (TopicSession) topicConnection.createSession(false, Session.AUTO_ACKNOWLEDGE);

			TopicSubscriber topicSubscriber = topicSession.createSubscriber((Topic) destination);

			topicSubscriber.setMessageListener(this);
		} catch (JMSException err) {
			err.printStackTrace();
		} catch (NamingException err) {
			err.printStackTrace();
		}
	}

	/**
	 * Chiude la ricezione dei messaggi sulla topic quotazioni
	 */
	public void stop() {
		try {
			topicConnection.stop();
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

	/**
	 * Apre la ricezione dei messaggi sulla topic quotazioni
	 */
	public void start() {
		try {
			topicConnection.start();
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

	public void onMessage(Message mex) {
		try {
			String state = mex.getStringProperty("State");
			switch (state) {
			case "NewProdotto":
				Integer productId = mex.getIntProperty("ProductId");
				LOG.info("New product added: " + productId);
				Product product = new Product();
				product.setProductId(productId);
				productService.insert(product);
				break;
			case "ProductInfoResponse":
				Integer prodId = mex.getIntProperty("ProductId");
				Integer disponibility = mex.getIntProperty("Dispopnibility");
				LOG.info("Got response for product " + prodId + "info request. Got disponibility: " + disponibility );
				break;
			default:
				break;
			}
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

}
