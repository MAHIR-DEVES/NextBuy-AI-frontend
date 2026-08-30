export interface AnalyticsItem {
  item_id: string;
  item_name?: string;
  price?: number;
  quantity?: number;
  item_category?: string;
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
 * Push an event to Google Tag Manager dataLayer
 */
export const pushEvent = (event: string, data: AnalyticsEventData = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event,
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
 * View Product
 */
export const trackViewItem = ({
  productId,
  productName,
  price,
  category,
}: {
  productId: string;
  productName: string;
  price: number;
  category?: string;
}) => {
  pushEvent('view_item', {
    ecommerce: {
      currency: 'BDT',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          item_category: category,
          quantity: 1,
        },
      ],
    },
  });
};

/**
 * Add To Cart
 */
export const trackAddToCart = ({
  productId,
  productName,
  price,
  quantity = 1,
  category,
}: {
  productId: string;
  productName: string;
  price: number;
  quantity?: number;
  category?: string;
}) => {
  pushEvent('add_to_cart', {
    ecommerce: {
      currency: 'BDT',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          item_category: category,
          quantity,
        },
      ],
    },
  });
};

/**
 * Begin Checkout
 */
export const trackBeginCheckout = ({
  value,
  items,
}: {
  value: number;
  items: AnalyticsItem[];
}) => {
  pushEvent('begin_checkout', {
    ecommerce: {
      currency: 'BDT',
      value,
      items,
    },
  });
};

/**
 * Purchase
 */
export const trackPurchase = ({
  transactionId,
  value,
  shipping = 0,
  items,
}: {
  transactionId: string;
  value: number;
  shipping?: number;
  items: AnalyticsItem[];
}) => {
  pushEvent('purchase', {
    ecommerce: {
      transaction_id: transactionId,
      currency: 'BDT',
      value,
      shipping,
      items,
    },
  });
};
