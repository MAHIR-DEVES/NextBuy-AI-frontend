import { getUser } from '@/utils/auth';

export interface AnalyticsItem {
  item_id: string;
  item_name?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  item_size?: string;
  item_color?: string;
  price?: number;
  quantity?: number;
}

export interface AnalyticsEventData {
  [key: string]: unknown;
}

export interface AnalyticsCustomer {
  external_id?: string;
  first_name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const PAGE_STATE_EVENTS = new Set([
  'page_view',
  'view_item',
  'add_to_cart',
  'view_cart',
  'begin_checkout',
  'purchase',
]);

/**
 * Track recently pushed event IDs to prevent duplicates
 * caused by React Strict Mode.
 */
const recentlyPushedEvents = new Map<string, number>();

const DEDUP_WINDOW_MS = 100;

/**
 * Storage key for guest users.
 *
 * Logged-in users use their database user.id.
 * Guest users use a persistent UUID stored in localStorage.
 */
const ANALYTICS_EXTERNAL_ID_KEY = 'analytics_external_id';

/**
 * Get external_id for both logged-in and guest users.
 *
 * Logged-in:
 *   external_id = user.id
 *
 * Guest:
 *   external_id = persistent UUID from localStorage
 */
const getAnalyticsExternalId = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  /**
   * First try to get logged-in user.
   */
  const user = getUser();

  if (user?.id) {
    return user.id;
  }

  /**
   * If user is not logged in,
   * create/reuse a persistent guest ID.
   */
  let externalId = localStorage.getItem(ANALYTICS_EXTERNAL_ID_KEY);

  if (!externalId) {
    externalId = crypto.randomUUID();

    localStorage.setItem(ANALYTICS_EXTERNAL_ID_KEY, externalId);
  }

  return externalId;
};

/**
 * Get current logged-in customer information.
 *
 * This is optional and only used when customer information
 * is required inside the analytics event.
 */
const getAnalyticsCustomer = (): AnalyticsCustomer | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const user = getUser();

  if (!user) {
    return undefined;
  }

  return {
    external_id: user.id || '',
    first_name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
  };
};

/**
 * Clean up old event IDs.
 */
const cleanupOldEvents = () => {
  const now = Date.now();

  for (const [eventId, timestamp] of recentlyPushedEvents.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      recentlyPushedEvents.delete(eventId);
    }
  }
};

/**
 * Remove only custom analytics state events.
 *
 * IMPORTANT:
 * GTM lifecycle events such as:
 *   gtm.js
 *   gtm.dom
 *   gtm.load
 *
 * are NOT removed.
 */
const clearStaleAnalyticsState = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer = window.dataLayer.filter(entry => {
    if (!entry || typeof entry !== 'object') {
      return true;
    }

    const eventName = entry.event;

    return !(typeof eventName === 'string' && PAGE_STATE_EVENTS.has(eventName));
  });
};

/**
 * Generate unique event ID.
 */
const generateEventId = (eventName: string) => {
  return `${eventName}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 12)}`;
};

/**
 * Push event to Google Tag Manager dataLayer.
 *
 * external_id is automatically added here.
 *
 * Logged-in user:
 *   external_id = database user.id
 *
 * Guest user:
 *   external_id = persistent anonymous UUID
 */
export const pushEvent = (
  event: string,
  data: AnalyticsEventData = {},
  eventId?: string,
) => {
  if (typeof window === 'undefined') return;

  cleanupOldEvents();

  /**
   * Prevent duplicate events.
   */
  if (eventId) {
    if (recentlyPushedEvents.has(eventId)) {
      console.debug(`[Analytics] Skipped duplicate event: ${eventId}`);

      return;
    }

    recentlyPushedEvents.set(eventId, Date.now());
  }

  window.dataLayer = window.dataLayer || [];

  /**
   * Clear only our custom state events.
   *
   * GTM's:
   * gtm.js
   * gtm.dom
   * gtm.load
   *
   * remain untouched.
   */
  if (PAGE_STATE_EVENTS.has(event)) {
    clearStaleAnalyticsState();
  }

  /**
   * Automatically resolve external_id.
   */
  const externalId = getAnalyticsExternalId();

  /**
   * Build final dataLayer event.
   *
   * external_id is available at top level.
   */
  const currentEvent = {
    event,

    ...(eventId
      ? {
          event_id: eventId,
        }
      : {}),

    external_id: externalId,

    ...data,
  };

  window.dataLayer.push(currentEvent);

  console.debug('[Analytics] Event pushed:', currentEvent);
};

/**
 * ============================
 * PAGE VIEW
 * ============================
 */
export const trackPageView = ({
  pagePath,
}: {
  pagePath?: string;
} = {}) => {
  pushEvent('page_view', {
    page_path:
      pagePath || `${window.location.pathname}${window.location.search}`,

    page_title: document.title,
  });
};

/**
 * ============================
 * VIEW ITEM
 * ============================
 *
 * GTM:
 * view_item
 *
 * Meta:
 * ViewContent
 */
export const trackViewItem = ({
  productId,
  productName,
  price,
}: {
  productId: string;
  productName: string;
  price: number;
}) => {
  const eventId = generateEventId('view_item');

  pushEvent(
    'view_item',
    {
      ecommerce: {
        currency: 'BDT',
        value: price,
        items: [
          {
            item_id: productId,
            item_name: productName,
            price,
            quantity: 1,
          },
        ],
      },
    },
    eventId,
  );
};

/**
 * ============================
 * ADD TO CART
 * ============================
 *
 * GTM:
 * add_to_cart
 *
 * Meta:
 * AddToCart
 */
export const trackAddToCart = ({
  productId,
  productName,
  price,
  quantity = 1,
  category = '',
  brand = '',
  variant = '',
  size = '',
  color = '',
}: {
  productId: string;
  productName: string;
  price: number;
  quantity?: number;
  category?: string;
  brand?: string;
  variant?: string;
  size?: string;
  color?: string;
}) => {
  const eventId = generateEventId('add_to_cart');

  const value = price * quantity;

  const externalId = getAnalyticsExternalId();
  const customer = getAnalyticsCustomer();

  const item = {
    item_name: productName,
    item_id: productId,
    price,

    item_brand: brand,
    item_category: category,
    item_variant: variant,
    item_size: size,
    item_color: color,

    quantity,
  };

  pushEvent(
    'add_to_cart',
    {
      ecommerce: {
        currency: 'BDT',
        value,
        items: [item],
      },

      ...(customer
        ? {
            customer,
          }
        : {}),

      meta_pixel: {
        event_name: 'AddToCart',
        event_id: eventId,

        external_id: externalId,

        content_ids: [productId],
        content_name: productName,
        content_type: 'product',

        currency: 'BDT',
        value,

        contents: [
          {
            id: productId,
            quantity,
            item_price: price,
          },
        ],
      },
    },
    eventId,
  );
};

/**
 * ============================
 * VIEW CART
 * ============================
 *
 * GTM:
 * view_cart
 *
 * Meta:
 * ViewCart
 */
export const trackViewCart = ({
  value,
  items,
}: {
  value: number;
  items: AnalyticsItem[];
}) => {
  const eventId = generateEventId('view_cart');

  const customer = getAnalyticsCustomer();

  pushEvent(
    'view_cart',
    {
      ecommerce: {
        currency: 'BDT',
        value,
        items,
      },

      ...(customer
        ? {
            customer,
          }
        : {}),
    },
    eventId,
  );
};

/**
 * ============================
 * BEGIN CHECKOUT
 * ============================
 *
 * GTM:
 * begin_checkout
 *
 * Meta:
 * InitiateCheckout
 */
export const trackBeginCheckout = ({
  value,
  items,
}: {
  value: number;
  items: AnalyticsItem[];
}) => {
  const eventId = generateEventId('begin_checkout');

  const customer = getAnalyticsCustomer();

  pushEvent(
    'begin_checkout',
    {
      ecommerce: {
        currency: 'BDT',
        value,
        items,
      },

      ...(customer
        ? {
            customer,
          }
        : {}),
    },
    eventId,
  );
};

/**
 * ============================
 * PURCHASE
 * ============================
 *
 * GTM:
 * purchase
 *
 * Meta:
 * Purchase
 */

export const trackPurchase = ({
  transactionId,
  value,
  tax = 0,
  shipping = 0,
  items,
  customer,
}: {
  transactionId: string;
  value: number;
  tax?: number;
  shipping?: number;
  items: AnalyticsItem[];
  customer?: AnalyticsCustomer;
}) => {
  const eventId = `purchase_${transactionId}`;

  const externalId = getAnalyticsExternalId();

  pushEvent(
    'purchase',
    {
      ecommerce: {
        transaction_id: transactionId,
        value,
        tax,
        shipping,
        currency: 'BDT',
        items,
      },

      // Customer information
      ...(customer
        ? {
            customer: {
              external_id: customer.external_id || externalId,
              first_name: customer.first_name || '',
              phone: customer.phone || '',
              email: customer.email || '',
              address: customer.address || '',
            },
          }
        : {
            customer: {
              external_id: externalId,
            },
          }),

      meta_pixel: {
        event_name: 'Purchase',
        event_id: eventId,

        // Logged-in user ID অথবা guest UUID
        external_id: externalId,

        content_type: 'product',
        currency: 'BDT',
        value,

        content_ids: items.map(item => item.item_id),

        contents: items.map(item => ({
          id: item.item_id,
          quantity: item.quantity || 1,
          item_price: item.price || 0,
        })),
      },
    },
    eventId,
  );
};
