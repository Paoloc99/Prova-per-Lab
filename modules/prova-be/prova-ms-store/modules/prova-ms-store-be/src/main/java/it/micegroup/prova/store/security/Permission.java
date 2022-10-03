package it.micegroup.prova.store.security;

import org.springframework.stereotype.Component;

@Component("permissionHolder")
public final class Permission {
	/// Utente
	public static final int UTENTE_SEARCH = 1448710;
	public static final int UTENTE_READ = 1448711;
	public static final int UTENTE_CREATE = 1448712;
	public static final int UTENTE_UPDATE = 1448713;
	public static final int UTENTE_DELETE = 1448714;
	public static final int UTENTE_REPORT = 1448715;

	public static final int UTENTE_FIND_BY_THE_ORDINE_OBJECT_KEY = 1448711373;

	/// Product
	public static final int PRODUCT_SEARCH = 1448720;
	public static final int PRODUCT_READ = 1448721;
	public static final int PRODUCT_CREATE = 1448722;
	public static final int PRODUCT_UPDATE = 1448723;
	public static final int PRODUCT_DELETE = 1448724;
	public static final int PRODUCT_REPORT = 1448725;

	public static final int PRODUCT_FIND_BY_THE_ORDER_ITEM_OBJECT_KEY = 1448721274;

	/// Ordine
	public static final int ORDINE_SEARCH = 1448730;
	public static final int ORDINE_READ = 1448731;
	public static final int ORDINE_CREATE = 1448732;
	public static final int ORDINE_UPDATE = 1448733;
	public static final int ORDINE_DELETE = 1448734;
	public static final int ORDINE_REPORT = 1448735;

	public static final int ORDINE_FIND_BY_UTENTE = 1448731371;
	public static final int ORDINE_FIND_BY_THE_ORDER_ITEM_OBJECT_KEY = 1448731174;

	/// OrderItem
	public static final int ORDER_ITEM_SEARCH = 1448740;
	public static final int ORDER_ITEM_READ = 1448741;
	public static final int ORDER_ITEM_CREATE = 1448742;
	public static final int ORDER_ITEM_UPDATE = 1448743;
	public static final int ORDER_ITEM_DELETE = 1448744;
	public static final int ORDER_ITEM_REPORT = 1448745;

	public static final int ORDER_ITEM_FIND_BY_ORDINE = 1448741173;
	public static final int ORDER_ITEM_FIND_BY_PRODUCT = 1448741272;

}

