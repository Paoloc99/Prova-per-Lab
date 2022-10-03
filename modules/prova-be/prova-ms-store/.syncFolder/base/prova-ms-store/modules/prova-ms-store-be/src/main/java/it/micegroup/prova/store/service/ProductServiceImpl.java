package it.micegroup.prova.store.service;

import java.util.List;

import java.util.Optional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;
import java.io.ByteArrayOutputStream;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import it.micegroup.voila2runtime.exception.BusinessException;
import org.springframework.context.i18n.LocaleContextHolder;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import org.springframework.stereotype.Service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import it.micegroup.prova.store.domain.Product;

import it.micegroup.prova.store.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.prova.store.domain.OrderItem;
import it.micegroup.voila2runtime.entity.GenericEntity;
import it.micegroup.voila2runtime.utils.AclUtils;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl extends BaseServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private static final String LIST_PRODUCT = "ListProduct";
	private static final String DETAIL_PRODUCT = "DetailProduct";
	// CHILD SERVICES
	private final OrderItemService orderItemService;

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LogManager.getLogger(ProductServiceImpl.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#findAll(org.
	 * springframework.data.domain.Pageable)
	 */
	@Override
	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#findAll()
	 */
	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public Optional<Product> findByObjectKey(String objectKey) {
		Product product = new Product(objectKey);
		return productRepository.findByProductId(product.getProductId());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#exists(java.lang.
	 * Object)
	 */
	@Override
	public boolean exists(Integer id) {
		return productRepository.existsById(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#insert(java.
	 * lang.Object)
	 */
	@Override
	public Product insert(@Valid Product entity) {
		return productRepository.save(entity);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see it.micegroup.prova.store.service.GenericEntityService#update(java.
	 * lang.Object)
	 */
	@Override
	public Product update(@Valid Product entity) {
		return productRepository.save(entity);
	}

	@Override
	public Optional<Product> delete(String objectKey) {
		return findByObjectKey(objectKey).map(product -> {
			productRepository.delete(product);
			return Optional.of(product);
		}).orElseGet(Optional::empty);
	}

	@Override
	public Page<Product> search(Specification<Product> specification, Pageable pageable) {
		specification = AclUtils.applyAcl(specification, "product.search");
		return productRepository.findAll(specification, pageable);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * it.micegroup.prova.store.service.GenericEntityService#deleteById(java.lang.
	 * Object)
	 */
	@Override
	public void deleteById(Integer id) {
		productRepository.deleteById(id);
	}

	@Override
	public Product bulkUpdate(Product product) {
		if (product.getTheOrderItem() != null) {
			List<OrderItem> updateTheOrderItem = product.getTheOrderItem().stream()
					.filter(child -> !child.isDeletedEntityState()).collect(Collectors.toList());
			List<OrderItem> deleteTheOrderItem = product.getTheOrderItem().stream()
					.filter(GenericEntity::isDeletedEntityState).collect(Collectors.toList());
			product.setTheOrderItem(updateTheOrderItem);
			deleteTheOrderItem.forEach(child -> orderItemService.deleteById(child.getTheOrderItemKey()));
		}
		Product update = this.update(product);
		return update;
	}

	public JasperPrint getJasperPrint(String reportName, Collection<?> collection) throws BusinessException {
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
		Map<String, Object> parameters = new HashMap<String, Object>();
		// Adds to the collection the compiled master report dependency (for subreport)
		// and return the compiled master report.
		List<String> fileNames = Arrays.asList(reportName, "ListOrderItemForProduct");
		JasperReport report = prepareJasperReport(reportName, parameters, fileNames);
		// Add report dir.
		parameters.put("REPORT_DIR", super.jasperReportsDir);
		// Add locale.
		Locale locale = LocaleContextHolder.getLocale();
		parameters.put(JRParameter.REPORT_LOCALE, locale);
		// Add resource boundle.
		ResourceBundle resourceBoundle = ResourceBundle.getBundle("applicationResources", locale);
		parameters.put(JRParameter.REPORT_RESOURCE_BUNDLE, resourceBoundle);
		// return PDF document.
		JasperPrint jasperPrint = null;
		try {
			return JasperFillManager.fillReport(report, parameters, dataSource);
		} catch (JRException e) {
			LOGGER.error("Error: ", e);
		}
		return jasperPrint;
	}

	public byte[] printPdfReport(String objectKey) {
		Collection<Product> productCollection = new ArrayList<Product>();
		productCollection.add(findByObjectKey(objectKey).get());
		byte[] pdf = null;
		try {
			pdf = JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_PRODUCT, productCollection));
		} catch (JRException e) {
			LOGGER.error("Error: ", e);
		}
		return pdf;
	}

	public byte[] printXLSList(Specification<Product> specification) {
		Collection<Product> productCollection = search(specification, Pageable.unpaged()).getContent();
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_PRODUCT, productCollection));
		} catch (JRException e) {
			LOGGER.error("Error: ", e);
		}
		return byteArrayOutputStream.toByteArray();
	}

}
