'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowLeft, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I place an order on Sera Place.com?',
    answer:
      'To place an order on Sera Place.com, simply browse through our product catalog, add your desired products to the cart, and proceed to checkout. You’ll be asked to provide shipping details and select a payment method before confirming your order.',
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer:
      'We accept multiple payment methods, including credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery (COD) across Bangladesh. You can choose your preferred payment method during checkout.',
  },
  {
    id: 3,
    question: 'Can I track my order?',
    answer:
      'Yes! Once your order is shipped, we will send you a tracking number via email or SMS. You can use this tracking number to monitor your package’s delivery status in real-time.',
  },
  {
    id: 4,
    question: 'How long does shipping take?',
    answer:
      'Shipping times vary based on your location. In general, inside Dhaka orders take 1-3 business days, and outside Dhaka orders are delivered within 3-5 business days.',
  },
  {
    id: 5,
    question: 'Can I return or exchange a product?',
    answer:
      'Yes, we accept returns and exchanges for eligible products within 7 to 14 days of delivery. Please ensure that the product is unused and in its original packaging with all accessories intact.',
  },
  {
    id: 6,
    question: 'How can I contact customer support?',
    answer:
      'You can contact our customer support team by emailing us at support@Sera Place.com or by calling us at 01629810013. We are available from 9:00 AM to 10:00 PM every day.',
  },
  {
    id: 7,
    question: 'Do you offer warranty on products?',
    answer:
      'Yes, we provide official brand or replacement warranty on select electronics and devices. Please check the individual product details page for specific warranty duration and terms.',
  },
  {
    id: 8,
    question: 'How do I apply a discount code?',
    answer:
      "To apply a discount code, enter your coupon code in the 'Promo Code' field during checkout. The discount amount will automatically adjust your total order price.",
  },
  {
    id: 9,
    question: 'Is my personal information secure?',
    answer:
      'Yes, we take your privacy and data security very seriously. We use standard SSL encryption protocols to protect your personal and payment details.',
  },
  {
    id: 10,
    question: 'Can I cancel or modify my order after placing it?',
    answer:
      'Once an order is placed, it moves quickly to processing. If you need to cancel or modify your order, please call our support team immediately at 01629810013 before shipment.',
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-title tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-body text-base md:text-lg">
            Have questions about ordering, delivery, or returns? Find quick
            answers to the most common questions below.
          </p>
        </header>

        <hr className="border-border" />

        {/* FAQ Accordion List */}
        <section className="divide-y divide-border">
          {faqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 font-semibold text-lg text-foreground hover:text-primary transition-colors py-1 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-6 text-body leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

        <hr className="border-border" />

        {/* Still Have Questions Footer */}
        <footer className="pt-4 space-y-4">
          <h2 className="text-xl font-bold text-subtitle">
            Still have questions?
          </h2>
          <p className="text-body text-sm md:text-base max-w-lg">
            If you couldn&apos;t find the answer you were looking for, please
            don&apos;t hesitate to reach out to our team.
          </p>
          <div className="flex flex-wrap gap-6 pt-2 text-sm font-semibold">
            <a
              href="tel:01629810013"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              01629810013
            </a>
            <a
              href="mailto:support@Sera Place.com"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              support@Sera Place.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
