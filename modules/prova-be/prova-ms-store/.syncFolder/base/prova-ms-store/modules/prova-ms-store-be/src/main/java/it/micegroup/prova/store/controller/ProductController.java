package it.micegroup.prova.store.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.turkraft.springfilter.boot.Filter;

import io.swagger.v3.oas.annotations.Operation;
import it.micegroup.voila2runtime.exception.BusinessException;
import it.micegroup.voila2runtime.response.Message.MessageLevelType;
import it.micegroup.voila2runtime.response.Messages;
import it.micegroup.prova.store.domain.Product;
import it.micegroup.prova.store.dto.EditProductDto;
import it.micegroup.prova.store.dto.ViewProductDto;
import it.micegroup.prova.store.dto.ViewOrderItemDto;
import it.micegroup.prova.store.exception.ResourceAlreadyFoundException;
import it.micegroup.prova.store.exception.ResourceNotFoundException;
import it.micegroup.prova.store.mapper.ProductMappers;
import it.micegroup.prova.store.mapper.OrderItemMappers;
import it.micegroup.prova.store.service.ProductService;
import it.micegroup.prova.store.service.OrderItemService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController extends BaseController<Product> {
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LogManager.getLogger(ProductController.class);

	/// ENTITY SERVICE
	private final ProductService productService;

	private final ProductMappers productMappers;
	// CHILD SERVICES
	private final OrderItemService orderItemService;
	// CHILD MAPPER
	private final OrderItemMappers orderItemMappers;

	// API
	/**
	 * {@code GET /product} : Get all product.
	 * 
	 * @param pageable
	 * @return Page of all Product.
	 */
	@GetMapping
	@Transactional(readOnly = true)
	@Operation(summary = "Get all Product")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_SEARCH.toString())")
	public ResponseEntity<Page<ViewProductDto>> findAll(Pageable pageable) {
		Page<ViewProductDto> collModel = productMappers.map(productService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /product} : Create a new Product.
	 *
	 * @param requestBody the Product to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Product, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Transactional
	@Operation(summary = "Create a new Product")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_CREATE.toString())")
	public ResponseEntity<ViewProductDto> insert(@RequestBody @Valid EditProductDto requestBody) {
		Product entity = productMappers.map(requestBody);
		if (productService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(Product.class.getSimpleName(), entity.getObjectKey());
		} else {
			entity = productService.insert(entity);
			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getProductId()).toUri();
			ViewProductDto dto = productMappers.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /product/:objectKey} : Get the product with given objectKey.
	 *
	 * @param objectKey the objectKey of the product to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the product, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Transactional(readOnly = true)
	@Operation(summary = "Get the Product with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_READ.toString())")
	public ResponseEntity<ViewProductDto> read(@PathVariable String objectKey) {
		Optional<Product> opt = Optional.of(productService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Product.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /product} : Updates an existing Product.
	 *
	 * @param requestBody the Product to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Product, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Product couldn't be
	 *         updated.
	 */
	@PutMapping
	@Transactional
	@Operation(summary = "Update an existing Product")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_UPDATE.toString())")
	public ResponseEntity<ViewProductDto> update(@RequestBody @Valid EditProductDto requestBody) {
		Product entity = productMappers.map(requestBody);
		entity = productService.bulkUpdate(entity);
		ViewProductDto dto = productMappers.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /product/:objectKey} : Delete the product with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the Product to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Transactional
	@Operation(summary = "Delete the Product with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_DELETE.toString())")
	public ResponseEntity<ViewProductDto> delete(@PathVariable String objectKey) {
		Optional<Product> opt = Optional.of(productService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Product.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /product/search?filter=:query} : Get the product filtered by
	 * given query.
	 *
	 * @param query the query to execute filtering the Product to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the product.
	 */
	@GetMapping("/search")
	@Transactional(readOnly = true)
	@Operation(summary = "Get the Product filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_SEARCH.toString())")
	public ResponseEntity<Page<ViewProductDto>> search(@Filter Specification<Product> specification, Pageable page) {
		Page<ViewProductDto> collModel = productMappers.map(productService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * GET /{objectKey:.+}/order-item: Get all OrderItem (childs) for the given
	 * Product by objectKey
	 * 
	 * @param objectKey ObjectKey of Product
	 * @param pageable
	 * @return Page of all OrderItem for the given Product
	 */
	@GetMapping("/{objectKey:.+}/order-item")
	@Transactional(readOnly = true)
	@Operation(summary = "Get all OrderItem (childs) for the given Product by objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_FIND_BY_THE_ORDER_ITEM_OBJECT_KEY.toString())")
	public ResponseEntity<Page<ViewOrderItemDto>> getTheOrderItemByObjectKey(@PathVariable String objectKey,
			Pageable pageable) {
		Product product = new Product();
		product.setObjectKey(objectKey);
		Page<ViewOrderItemDto> collModel = orderItemMappers.map(orderItemService.findByTheProduct(product, pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for Product by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@Transactional(readOnly = true)
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for Product by object key")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(productService.printPdfReport(objectKey));
	}

	/**
	 * GET: /print/xlsx-list: Return the XLS list report for Product filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Transactional(readOnly = true)
	@Operation(summary = "Return the XLS list report for Product filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.PRODUCT_REPORT.toString())")
	public void printXlsxList(@Filter Specification<Product> specification, HttpServletResponse response) {
		byte[] body = productService.printXLSList(specification);
		prepareReportResponse("Elenco Product.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	private ResponseEntity<ViewProductDto> toResponseEntity(Optional<Product> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(productMappers.map(response), header, status))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	private <T> ResponseEntity<Page<T>> toResponseEntityPaged(Page<T> collModel, HttpHeaders header) {
		return ResponseEntity.ok().headers(header).body(collModel);
	}
}
