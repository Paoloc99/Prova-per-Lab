package it.micegroup.prova.database.jms;

import java.util.Observable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import it.micegroup.prova.database.domain.Product;
import it.micegroup.prova.database.service.ProductService;

public class FromStoreJMSListener implements MessageListener {
	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(FromStoreJMSListener.class);
	@Autowired
	public ProductService productService;

	private Connection connection;
	private TopicSession topicSession = null;
	private Session session;
	private Destination queue = null;
	private MessageProducer producer = null;
	ActiveMQConnectionFactory connectionFactory = null;

	/**
	 * Chiude la ricezione dei messaggi sulla topic quotazioni
	 */
	public void stop() {
		try {
			connection.stop();
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

	/**
	 * Apre la ricezione dei messaggi sulla topic quotazioni
	 */
	public void start() {
		try {
			connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
			connection = connectionFactory.createConnection();
			connection.start();
			this.session = connection.createSession(false,Session.AUTO_ACKNOWLEDGE);
			queue = this.session.createQueue("StoreToDatabase");

			this.producer = this.session.createProducer(null);
			this.producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

			MessageConsumer consumer = this.session.createConsumer(queue);
			consumer.setMessageListener(this);
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

	public void onMessage(Message mex) {
		try {
			String state = mex.getStringProperty("State");
			switch (state) {
			case "ProductInfo":
				TextMessage messageProduct = null;
				messageProduct = this.session.createTextMessage();
				Integer productId = mex.getIntProperty("ProductId");
				LOG.info("Getting info product with ID: " + productId);
//				if(productService.exists(productId)) {
//					Product product = productService.findByObjectKey(productId.toString()).get();
//					messageProduct.setIntProperty("Disponibility", product.getDisponibility());
//					messageProduct.setIntProperty("Cost", product.getCost());
					messageProduct.setIntProperty("Disponibility", 10);
					messageProduct.setIntProperty("Cost", 20);
					messageProduct.setJMSCorrelationID(mex.getJMSCorrelationID());

		            //Send the response to the Destination specified by the JMSReplyTo field of the received message,
		            //this is presumably a temporary queue created by the client
		            this.producer.send(mex.getJMSReplyTo(), messageProduct);
//				}
//				else {
//					messageProduct.setText("ERROE, PRODUCT DOESN'T EXISTS");
//				}
				break;
			case "PurchasedProduct":
				Integer prodId = mex.getIntProperty("ProductId");
				Integer disponibility = mex.getIntProperty("Dispopnibility");
				LOG.info("Got Message ProdottoAcquistato with: ( disponibility: " + disponibility + ", prodId: "
						+ prodId + " )");
				// UPDATE di db
				break;
			default:
				break;
			}
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

}
