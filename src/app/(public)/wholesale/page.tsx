import React from 'react';
import Link from 'next/link';
import {
  Percent,
  Headphones,
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  ArrowLeft,
  Building2,
} from 'lucide-react';

export default function WholesalePage() {
  const benefits = [
    {
      icon: Percent,
      title: 'বিশেষ বাল্ক ডিসকাউন্ট',
      description:
        'বেশি পরিমাণে অর্ডার করলে পাবেন অত্যন্ত আকর্ষণীয় এবং লাভজনক বিশেষ ছাড়।',
    },
    {
      icon: Headphones,
      title: 'ডেডিকেটেড কাস্টমার সাপোর্ট',
      description:
        'আপনার যেকোনো প্রয়োজন বা প্রশ্নের দ্রুত সমাধানে আমাদের স্পেশাল টিম সবসময় পাশে থাকবে।',
    },
    {
      icon: Truck,
      title: 'দ্রুত ডেলিভারি',
      description:
        'সমগ্র বাংলাদেশের যেকোনো প্রান্তে ক্যাশ অন ডেলিভারিসহ দ্রুত এবং নির্ভরযোগ্য পরিবহন সেবা।',
    },
    {
      icon: ShieldCheck,
      title: 'গুণগত মানের নিশ্চয়তা',
      description:
        'চাইনাসহ বিশ্বস্ত ম্যানুফ্যাকচারার থেকে সংগৃহীত ১০০% জেনুইন এবং কোয়ালিটি টেস্টেড পণ্য।',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-md bg-accent/40 border border-border p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-accent text-primary rounded-2md mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-title mb-4 tracking-tight">
            হোলসেল পার্টনারশিপ
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-body leading-relaxed">
            আমাদের পণ্যের হোলসেল পার্টনার হিসেবে আপনার ব্যবসাকে নতুন উচ্চতায়
            নিয়ে যান। আমরা অফার করছি সেরা দামে প্রিমিয়াম কোয়ালিটির
            ইলেকট্রনিক্স ও লাইফস্টাইল গ্যাজেটস।
          </p>
        </section>

        {/* Benefits Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-subtitle">
              কেন আমাদের সাথে হোলসেল পার্টনার হবেন?
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              আপনার ব্যবসার প্রবৃদ্ধি ও সর্বোচ্চ মুনাফা নিশ্চিত করতে আমাদের
              বিশেষ সুবিধাসমূহ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-md border border-border bg-card transition-all duration-300 hover:shadow-md hover:border-primary/50 flex gap-4 items-start"
                >
                  <div className="p-3 rounded-md bg-accent text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="rounded-md bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">যোগাযোগের তথ্য</h2>
            <p className="text-primary-foreground/90 text-sm md:text-base">
              হোলসেল প্রাইস তালিকা পেতে বা সরাসরি অর্ডার বুক করতে নিচের নাম্বারে
              কল করুন অথবা ইমেইল পাঠাতে পারেন।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
              {/* Phone Card */}
              <a
                href="tel:01629810013"
                className="flex items-center gap-4 p-4 rounded-md bg-background/10 backdrop-blur-md border border-primary-foreground/20 hover:bg-background/20 transition-all duration-200"
              >
                <div className="p-3 rounded-full bg-primary-foreground/10">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/80 font-medium block">
                    ফোন করুন
                  </span>
                  <span className="text-lg font-bold">01629810013</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:support@jonoprio.com"
                className="flex items-center gap-4 p-4 rounded-md bg-background/10 backdrop-blur-md border border-primary-foreground/20 hover:bg-background/20 transition-all duration-200"
              >
                <div className="p-3 rounded-full bg-primary-foreground/10">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/80 font-medium block">
                    ইমেইল পাঠান
                  </span>
                  <span className="text-base font-bold break-all">
                    support@jonoprio.com
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
