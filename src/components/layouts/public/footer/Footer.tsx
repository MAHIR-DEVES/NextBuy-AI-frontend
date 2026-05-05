import React from 'react';
import { Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Electronics', link: '#' },
    { name: 'Fashion', link: '#' },
    { name: 'Home & Garden', link: '#' },
    { name: 'Sports & Entertainment', link: '#' },
    { name: 'Health & Beauty', link: '#' },
    { name: 'Machinery', link: '#' },
  ];

  const quickLinks = [
    { name: 'About Us', link: '#' },
    { name: 'Services', link: '#' },
    { name: 'Categories', link: '#' },
    { name: 'Privacy Policy', link: '#' },
    { name: 'Terms & Conditions', link: '#' },
    { name: 'FAQs', link: '#' },
  ];

  const customerService = [
    { name: 'Contact Us', link: '#' },
    { name: 'Track Order', link: '#' },
    { name: 'Returns & Refunds', link: '#' },
    { name: 'Shipping Info', link: '#' },
    { name: 'Warranty Policy', link: '#' },
    { name: 'Size Guide', link: '#' },
  ];

  const SOCIAL_ICONS = [
    {
      title: 'Facebook',
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg',
      link: '#',
    },
    {
      title: 'X',
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg',
      className: 'dark:invert',
      link: '#',
    },
    {
      title: 'Instagram',
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg',
      link: '#',
    },
  ];
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-orange-500">NEXT</span>
              <span className="text-2xl font-bold text-gray-800">BUY</span>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Your trusted global sourcing partner. We connect buyers with
              verified manufacturers worldwide, ensuring quality products at
              competitive prices.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">
                  123 Business Avenue, Tech Park, Singapore 123456
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">support@nextbuy.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">Mon-Fri: 9AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <a
                    href={category.link}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.link}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {customerService.map((service, idx) => (
                <li key={idx}>
                  <a
                    href={service.link}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center">
              © {currentYear} NEXTBUY. All rights reserved.
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_ICONS.map((social, idx) => (
                <Image
                  key={idx}
                  src={social.src}
                  alt={social.title}
                  width={24}
                  height={24}
                  className={`h-6 w-6 ${social.className || ''}`}
                />
              ))}
            </div>

            {/* Payment Methods with Real Icons */}
            <div className="flex items-center gap-2">
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg"
                alt="Visa"
                height={24}
                width={24}
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg"
                alt="Mastercard"
                height={24}
                width={24}
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amex.svg"
                alt="American Express"
                height={24}
                width={24}
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg"
                alt="PayPal"
                height={24}
                width={24}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
