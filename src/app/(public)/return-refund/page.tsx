'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReturnAndRefundPolicyPage() {
  const policies = [
    {
      title: 'ডেলিভারি পর ম্যানুফেকচারিং ত্রুটি',
      desc: 'পণ্য ডেলিভারি পাওয়ার পর ২৪ ঘণ্টার মধ্যে আমাদের হটলাইনে ম্যানুফেকচারিং ত্রুটি জানাতে হবে। ত্রুটিযুক্ত পণ্য আমাদের স্টোর থেকে পরিবর্তন করা যাবে। এক্ষেত্রে আমাদের এক্সপার্টগণ পণ্যে ত্রুটি পর্যবেক্ষণ করে তা পরিবর্তন করার পদক্ষেপ গ্রহণ করবেন।',
    },
    {
      title: 'রিপ্লেসমেন্ট ও এক্সচেঞ্জ',
      desc: 'প্রোডাক্ট রিসিভ করার দিন থেকে ৩ দিনের মধ্যে যদি কোনো সমস্যা দেখা দেয়, তাহলে গ্রাহক সম্পূর্ণ ফ্রি রিপ্লেসমেন্ট পাবেন অথবা এক্সচেঞ্জ করে অন্য যেকোনো পণ্য নিতে পারবেন। অর্ডারকৃত পণ্য যদি স্টকে না থাকে এবং পরবর্তী ১০ দিনের মধ্যে পণ্য গ্রাহক না পেয়ে থাকেন, এই ক্ষেত্রে গ্রাহক সম্পূর্ণ টাকা ফেরত পাবেন।',
    },
    {
      title: 'ডেলিভারি চার্জ',
      desc: '৩ দিনের মধ্যে ইস্যু জানালে পণ্য গ্রাহক থেকে ফেরত এবং গ্রাহককে পাঠানোর ক্ষেত্রে ডেলিভারি চার্জ আমরা বহন করবো।',
    },
    {
      title: 'পণ্য ফেরত ও রিফান্ড',
      desc: 'পণ্য হাতে পাওয়ার পর যদি লাগবে না মনে হয়, ভুল ক্রমে অর্ডার করলে, বা একাধিক অর্ডার হয়ে গেলে গ্রাহক পণ্যটি ফেরত দিয়ে রিফান্ড অথবা অন্য যেকোনো কিছু নিতে পারবেন, তবে পণ্যটি অবশ্যই ইন্ট্যাক্ট থাকতে হবে। বক্স খুললে বা ছিঁড়ে ফেললে কোনো প্রকার ক্লেইম করা হবে না, রিফান্ড বা এক্সচেঞ্জ করা হবে না।',
    },
    {
      title: 'ওয়ারেন্টি',
      desc: 'পণ্য পাওয়ার ৩ দিন পরের সকল প্রোডাক্টের ওয়ারেন্টি রেগুলার ওয়ারেন্টি হিসেবে গণ্য হবে এবং এই ক্ষেত্রে পণ্য অফিসে পাঠাতে এবং গ্রাহকের কাছে পাঠাতে ডেলিভারি চার্জ গ্রাহককে বহন করতে হবে।',
    },
    {
      title: 'কুরিয়ার ইস্যু',
      desc: 'পণ্য ভাঙ্গা থাকলে বা প্যাকেট ছেঁড়া থাকলে কুরিয়ার থেকে পণ্য রিসিভ করবেন না। কুরিয়ারে ক্ষতিগ্রস্ত পণ্য রিসিভ করলে তা নিজ দায়িত্বে করতে হবে এবং পরে কোনো অভিযোগ গ্রহণযোগ্য হবে না। রিসিভ করার পর মিসিং বা ড্যামেজ পাওয়া গেলে গ্রাহককে পার্সেল খোলার সময় ভিডিও ধারণ করতে হবে, অন্যথায় কোনো অভিযোগ গ্রহণযোগ্য হবে না।',
    },
    {
      title: 'রিফান্ড সময়কাল',
      desc: 'নির্দিষ্ট কারণে পণ্য রিটার্ন দিলে তার মূল্য রিফান্ড করতে ৩ থেকে ১০ কার্যদিবস লাগতে পারে, অনলাইন পেমেন্টের ক্ষেত্রে আরও বেশি সময় লাগতে পারে। বিকাশ / অনলাইন / POS পেমেন্ট রিফান্ডের ক্ষেত্রে রিফান্ড চার্জ প্রযোজ্য।',
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
            <Truck className="w-4 h-4" />
            <span>Customer Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-title tracking-tight">
            ডেলিভারি, রিটার্ন, এবং রিফান্ড নীতিমালা
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Last Updated: July 13, 2024</span>
          </div>
        </header>

        <hr className="border-border" />

        {/* Policy Items List */}
        <div className="space-y-8">
          {policies.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {idx + 1}. {item.title}
              </h2>
              <p className="text-body leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <hr className="border-border" />

        {/* Contact Footer */}
        <footer className="pt-2 space-y-4">
          <h2 className="text-2xl font-bold text-subtitle">যোগাযোগ</h2>
          <p className="text-body text-sm md:text-base">
            এই ডেলিভারি, রিটার্ন, এবং রিফান্ড নীতিমালা বা আমাদের পরিষেবা
            সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:
          </p>

          <div className="space-y-2 pt-1">
            <p className="font-semibold text-foreground text-sm">
              Jonoprio.com কাস্টমার সাপোর্ট
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-1 text-sm">
              <a
                href="mailto:support@jonoprio.com"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-primary" />
                support@jonoprio.com
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
            Jonoprio.com-এ আপনার আস্থার জন্য ধন্যবাদ। আমরা আপনার সন্তুষ্টি এবং
            বিশ্বাসের মূল্য দিই।
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
