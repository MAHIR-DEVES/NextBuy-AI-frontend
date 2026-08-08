import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <header className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-title tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-body max-w-2xl leading-relaxed">
            Have a question or need support? We’re always ready to help you.
            Reach out to us through any of the channels below.
          </p>
        </header>

        <hr className="border-border" />

        {/* Direct Contact Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <Phone className="w-4 h-4" />
              <span>Direct Call</span>
            </div>
            <a
              href="tel:01629810013"
              className="text-2xl md:text-3xl font-extrabold text-foreground hover:text-primary transition-colors block"
            >
              01629810013
            </a>
            <p className="text-sm text-muted-foreground">
              Available 9:00 AM – 10:00 PM for instant assistance.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </div>
            <a
              href="mailto:support@jonoprio.com"
              className="text-2xl md:text-3xl font-extrabold text-foreground hover:text-primary transition-colors block break-all"
            >
              support@jonoprio.com
            </a>
            <p className="text-sm text-muted-foreground">
              Send us your inquiries anytime. We reply promptly.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Location & Operating Hours */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <MapPin className="w-4 h-4" />
              <span>Our Location</span>
            </div>
            <p className="text-xl font-bold text-foreground leading-snug">
              Mirpur 2, Kataltola <br />
              <span className="text-muted-foreground text-base font-normal">
                (Online Store)
              </span>
            </p>
            <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <Clock className="w-4 h-4" />
              <span>Operating Hours</span>
            </div>
            <p className="text-xl font-bold text-foreground">Everyday</p>
            <p className="text-sm text-muted-foreground">
              9:00 AM – 10:00 PM (BST)
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Outro Note */}
        <footer className="pt-4 space-y-2">
          <h2 className="text-xl font-bold text-subtitle">
            Thank you for choosing Jonoprio.com
          </h2>
          <p className="text-body max-w-xl text-base leading-relaxed">
            Your trust and satisfaction mean everything to us. We strive to
            provide the best quality products and services to make your shopping
            experience seamless.
          </p>
        </footer>
      </div>
    </div>
  );
}
