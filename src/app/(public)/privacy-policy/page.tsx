'use client';

import React from 'react';
import { ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content:
        'We collect information to enhance your experience and provide better services, including:',
      bullets: [
        'Personal Information: Name, email, and address during account creation; first name, last name, phone number, email, division, city, area, address 1, and address 2 when updating your address.',
        'Transaction Information: Product name, quantity, price, and delivery address for purchases.',
        'Payment Information: Credit/debit card details, billing address, and payment method for order processing.',
        'Technical Information: Device, browser, IP address, and browsing behavior to improve functionality.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content:
        'We use your information to provide and improve our services, including:',
      bullets: [
        'Providing Services: Process and deliver orders, manage accounts, and offer customer support.',
        'Improving Our Services: Analyze user interactions to enhance website functionality.',
        'Communicating with You: Send order updates, promotional offers, and relevant communications.',
        'Security and Fraud Prevention: Protect users and the platform from fraud and security threats.',
      ],
    },
    {
      title: 'Sharing Your Information',
      content: 'We only share your information in specific cases:',
      bullets: [
        'With Service Providers: Trusted third-party providers for payment processing, order fulfillment, and delivery.',
        'For Legal Reasons: Disclosure if required by law or to protect Sera Place.com’s rights, property, or safety.',
      ],
    },
    {
      title: 'Data Security',
      content:
        'We implement robust security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure. We strive to use commercially acceptable means to safeguard your data.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access, update, or delete your personal information. Manage your data by logging into your account or contact our customer support team for assistance.',
    },
    {
      title: 'Cookies',
      content:
        'We use cookies to enhance your browsing experience. Cookies are small files stored on your device to remember preferences and improve functionality. Manage cookie preferences through your browser settings.',
    },
    {
      title: 'Changes to This Privacy Policy',
      content:
        'We may update this Privacy Policy periodically to reflect changes in practices or legal requirements. Updates will be posted here with a revised effective date. Review this policy regularly to stay informed.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Notice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-title tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Last Updated: July 13, 2024</span>
          </div>
        </header>

        <hr className="border-border" />

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-subtitle">Introduction</h2>
          <p className="text-body leading-relaxed text-base md:text-lg">
            Welcome to Sera Place.com, an e-commerce platform based in
            Bangladesh. We are committed to safeguarding your privacy and
            protecting the personal information you share with us. This Privacy
            Policy explains how we collect, use, share, and protect your data
            when you visit our website or use our services.
          </p>
        </section>

        {/* Main Content Sections */}
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {section.title}
              </h2>
              <p className="text-body leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
              {section.bullets && (
                <ul className="list-disc list-inside space-y-2 pt-1 text-body text-sm md:text-base pl-2">
                  {section.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <hr className="border-border" />

        {/* Contact Section */}
        <footer className="pt-2 space-y-4">
          <h2 className="text-2xl font-bold text-subtitle">Contact Us</h2>
          <p className="text-body text-sm md:text-base">
            For questions or concerns about this Privacy Policy or our data
            practices, please reach out:
          </p>

          <div className="space-y-2 pt-1">
            <p className="font-semibold text-foreground text-sm">
              Sera Place.com Customer Support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-1 text-sm">
              <a
                href="mailto:support@Sera Place.com"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-primary" />
                support@Sera Place.com
              </a>
              <a
                href="tel:01629810013"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                01629810013
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-6">
            Thank you for choosing Sera Place.com. We value your trust and are
            dedicated to protecting your privacy.
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
