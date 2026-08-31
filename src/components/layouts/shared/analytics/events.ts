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

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Generate unique event ID
 */
const generateEventId = (eventName: string) => {
  return `${eventName}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 12)}`;
};

/**
 * Push event to Google Tag Manager dataLayer
 */
export const pushEvent = (
  event: string,
  data: AnalyticsEventData = {},
  eventId?: string,
) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event,
    ...(eventId ? { event_id: eventId } : {}),
    ...data,
  });
};

/**
 * Page View
 */
export const trackPageView = (pagePath?: string) => {
  pushEvent('page_view', {
    page_path:
      pagePath || `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
};

/**
 * VIEW ITEM
 *
 * GTM event:
 * view_item
 *
 * Meta Pixel:
 * ViewContent
 */
export const trackViewItem = ({
  productId,
  productName,
  price,
  category = '',
  brand = '',
}: {
  productId: string;
  productName: string;
  price: number;
  category?: string;
  brand?: string;
}) => {
  const eventId = generateEventId('view_item');

  const item = {
    item_name: productName,
    item_id: productId,
    price,
    item_brand: brand,
    item_category: category,

    currency: 'BDT',
    quantity: 1,
  };

  pushEvent(
    'view_item',
    {
      ecommerce: {
        currency: 'BDT',
        value: price,
        items: [item],
      },

      meta_pixel: {
        event_name: 'ViewContent',
        event_id: eventId,
        content_ids: [productId],
        content_name: productName,
        content_type: 'product',
        currency: 'BDT',
        value: price,
        contents: [
          {
            id: productId,
            quantity: 1,
            item_price: price,
          },
        ],
      },
    },
    eventId,
  );
};

/**
 * ADD TO CART
 *
 * GTM event:
 * add_to_cart
 *
 * Meta Pixel:
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

      meta_pixel: {
        event_name: 'AddToCart',
        event_id: eventId,
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
 * VIEW CART
 *
 * GTM event:
 * view_cart
 *
 * Meta Pixel:
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

  pushEvent(
    'view_cart',
    {
      ecommerce: {
        currency: 'BDT',
        value,
        items,
      },
    },
    eventId,
  );
};

/**
 * BEGIN CHECKOUT
 *
 * GTM event:
 * begin_checkout
 *
 * Meta Pixel:
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

  pushEvent(
    'begin_checkout',
    {
      ecommerce: {
        currency: 'BDT',
        value,
        items,
      },
    },
    eventId,
  );
};

/**
 * PURCHASE
 *
 * GTM event:
 * purchase
 *
 * Meta Pixel:
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
  customer?: {
    external_id?: string;
    first_name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}) => {
  const eventId = `purchase_${transactionId}`;

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

      ...(customer
        ? {
            customer: {
              external_id: customer.external_id || '',
              first_name: customer.first_name || '',
              phone: customer.phone || '',
              email: customer.email || '',
              address: customer.address || '',
            },
          }
        : {}),

      meta_pixel: {
        event_name: 'Purchase',
        event_id: eventId,
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
