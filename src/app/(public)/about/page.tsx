import React from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  HeartHandshake,
  Lock,
  CheckCircle2,
  Smile,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Wide Range of Products',
      description:
        'Whether you’re looking for the latest earphones, smartwatches, or stylish travel bags, we’ve got you covered with a carefully curated selection.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      description:
        'We source our products directly from reputable manufacturers in China, ensuring every item meets strict standards of quality and reliability.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Centric Approach',
      description:
        'Enjoy a seamless shopping experience with easy navigation, fast delivery across Bangladesh, and a comprehensive return policy.',
    },
    {
      icon: Lock,
      title: 'Secure Shopping',
      description:
        'Your privacy is paramount. We utilize advanced encryption technologies to protect your personal details and ensure safe transactions.',
    },
    {
      icon: CheckCircle2,
      title: '100% Genuine Products',
      description:
        'No imitations or third-party assembly. We import directly from China and deliver authentic products straight to your doorstep.',
    },
    {
      icon: Smile,
      title: '100% Customer Satisfaction',
      description:
        'Your trust is our main priority. We believe in quality and honesty to achieve total customer satisfaction, Insha Allah.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-accent/40 py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            Direct Direct Imports • Trusted Quality
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-title mb-6">
            About Jonoprio.com
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Your premier online destination in Bangladesh for the latest in
            sound equipment, smart electronics, computer accessories, and
            fashion bags—bringing quality directly from China to your home.
          </p>
        </div>
      </section>

      {/* Main Mission Section */}
      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="rounded-md border border-border bg-card p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-subtitle mb-4">
            Welcome to Jonoprio.com
          </h2>
          <p className="text-body leading-relaxed text-base md:text-lg">
            At Jonoprio.com, we are committed to bringing you top-quality
            products directly from trusted manufacturers in China, ensuring you
            receive the best value for your money. Our mission is to provide our
            customers in Bangladesh with an unparalleled shopping experience by
            offering a diverse range of products at competitive prices, backed
            by exceptional customer service and a hassle-free return policy.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-title">Why Choose Us</h2>
            <p className="text-muted-foreground mt-2">
              Built on trust, authenticity, and customer delight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-md border border-border bg-card p-6 transition-all hover:border-primary/50"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="rounded-md bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Have Questions or Need Assistance?
              </h2>
              <p className="text-primary-foreground/90 leading-relaxed">
                Reach out to our team and we’ll be happy to help! Thank you for
                choosing Jonoprio.com. We value your trust and satisfaction.
              </p>
            </div>

            <div className="bg-background/10 backdrop-blur-md rounded-md p-6 border border-primary-foreground/20 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-foreground/10 rounded-full">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-primary-foreground/70 uppercase font-semibold">
                    Call Us
                  </div>
                  <a
                    href="tel:01301949648"
                    className="text-lg font-bold hover:underline"
                  >
                    01301949648
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-foreground/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-primary-foreground/70 uppercase font-semibold">
                    Email Us
                  </div>
                  <a
                    href="mailto:support@jonoprio.com"
                    className="text-lg font-bold hover:underline"
                  >
                    support@jonoprio.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
