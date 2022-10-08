package it.micegroup.prova.database.jms;

import java.util.List;
import java.util.Observable;
import java.util.Properties;
import java.util.Random;
import java.util.stream.Collectors;

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
import javax.validation.constraints.Size;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import it.micegroup.prova.database.domain.Product;
import it.micegroup.prova.database.dto.EditProductDto;
import it.micegroup.prova.database.service.ProductService;

public class FromGatewayJMSListener implements MessageListener {
	Random random = new Random();
	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(FromGatewayJMSListener.class);
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
			queue = this.session.createQueue("GatewayToDatabase");

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
			case "newProduct":
				 String productName=mex.getStringProperty("productName");
				 Integer cost=mex.getIntProperty("cost");
				 Integer disponibility=mex.getIntProperty("disponibility");
				 String description=mex.getStringProperty("description");
				 String image=mex.getStringProperty("image");
				EditProductDto product = new EditProductDto();
				product.setCost(cost);
				product.setDescription(description);
				product.setImage(image);
				product.setProductId(disponibility);
				product.setProductName(productName);
				product.setProductId(random.nextInt());
				LOG.info("Ricevuto un nuovo prodotto dall'ADMIN: " + product.getProductName());
				break;
			default:
				break;
			}
		} catch (JMSException err) {
			err.printStackTrace();
		}
	}

}
