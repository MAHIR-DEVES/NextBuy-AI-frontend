'use client';

import React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderAndDeliveryTermsPage() {
  const terms = [
    {
      num: '১',
      title: 'অগ্রিম গ্রহণের পরিমাণ (ক্যাশ অন ডেলিভারি এবং কুরিয়ার কন্ডিশন)',
      desc: 'যেকোনো পণ্যের অর্ডার গ্রহণের ক্ষেত্রে আগে ডেলিভারি চার্জ পরিশোধ করতে হবে।',
    },
    {
      num: '২',
      title: 'অগ্রিম গ্রহণের পরিমাণ (প্রি-অর্ডার)',
      desc: 'যেকোনো পণ্যের প্রি-অর্ডার করার ক্ষেত্রে অগ্রিম গ্রহণের পরিমাণ পণ্য অনুযায়ী নির্ধারণ করা হবে।',
    },
    {
      num: '৩',
      title: 'প্রি-অর্ডারকৃত পণ্যের সরবরাহ সময়',
      desc: 'সাধারণত প্রি-অর্ডারকৃত পণ্য সরবরাহ করতে আমাদের ৭-১০ কর্মদিবস সময় লাগে। কিছু ক্ষেত্রে, ১৫-২০ কিংবা তারও বেশি কর্মদিবস পর্যন্ত সময় লাগতে পারে।',
    },
    {
      num: '৪',
      title: 'আন্তর্জাতিক বাজারে মূল্য পরিবর্তন',
      desc: 'আন্তর্জাতিক বাজারে পণ্যের মূল্য পরিবর্তিত হতে পারে, সেক্ষেত্রে প্রি-অর্ডারকৃত পণ্যের সাথে অতিরিক্ত মূল্য যোগ করতে হবে অথবা অগ্রিম প্রদানকৃত মূল্য ফেরত নেওয়া যাবে।',
    },
    {
      num: '৫',
      title: 'ডেলিভারি চার্জ নির্ধারণ',
      desc: 'ঢাকা সিটির ভিতরে এবং বাহিরে বা দেশের যেকোন জায়গায় ডেলিভারির ক্ষেত্রে আলোচনা সাপেক্ষে কুরিয়ারের সার্ভিস চার্জ অনুযায়ী ডেলিভারি চার্জ নির্ধারণ করা হবে।',
    },
    {
      num: '৬',
      title: 'পার্সিয়াল পেমেন্ট এবং ডেলিভারি চার্জ',
      desc: 'যেকোনো এক্সেসরিজের জন্য যদি পার্সিয়াল পেমেন্ট করা হয় সেক্ষেত্রে ডেলিভারি চার্জ এবং ক্ষেত্র বিশেষে এর সাথে কন্ডিশন চার্জ প্রযোজ্য হবে কুরিয়ার কোম্পানির নিয়ম অনুযায়ী।',
    },
    {
      num: '৭',
      title: 'অর্ডার প্লেসমেন্ট সময়',
      desc: 'যেকোনো পণ্যের অর্ডার অবশ্যই বিকাল ৫.০০টার মধ্যে প্লেস করতে হবে। বিকাল ৫.০০টার পর কোনো পণ্যের অর্ডার পরবর্তী দিনের অর্ডার হিসেবে গণ্য করা হবে।',
    },
    {
      num: '৮',
      title: 'ডেলিভারি সময়সূচী (বাংলাদেশের নিয়ম অনুযায়ী)',
      desc: 'সাধারণত ঢাকা সিটির মধ্যে ডেলিভারি ২-৩ কর্মদিবসের মধ্যে সম্পন্ন করা হয়। ঢাকার বাইরে ৫-৭ কর্মদিবস সময় লাগতে পারে, তবে এটি নির্ভর করে স্থানীয় কুরিয়ার পরিষেবার উপর।',
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
            <CreditCard className="w-4 h-4" />
            <span>Ordering Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-title tracking-tight leading-tight">
            অর্ডার এর অগ্রিম গ্রহণ এবং ডেলিভারি চার্জ সংক্রান্ত নিয়মাবলী
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Last Updated: August 01, 2025</span>
          </div>
        </header>

        <hr className="border-border" />

        {/* Terms Items List */}
        <div className="space-y-8">
          {terms.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-baseline gap-3">
                <span className="text-primary text-base font-extrabold">
                  {item.num}.
                </span>
                <span>{item.title}</span>
              </h2>
              <p className="text-body leading-relaxed text-sm md:text-base pl-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Notice Section */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 border border-primary/20 text-foreground text-sm leading-relaxed">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p>
            <span className="font-bold">বি:দ্র: </span>
            এই নিয়মাবলী শুধুমাত্র সাময়িক সময়ের জন্য প্রযোজ্য এবং পরিস্থিতির
            পরিবর্তনের সাথে সাথে তা সংশোধিত হতে পারে।
          </p>
        </div>

        <hr className="border-border" />

        {/* Contact Footer */}
        <footer className="pt-2 space-y-4">
          <h2 className="text-2xl font-bold text-subtitle">যোগাযোগ</h2>
          <p className="text-body text-sm md:text-base">
            এই অর্ডার এর অগ্রিম গ্রহণ এবং ডেলিভারি চার্জ সংক্রান্ত নিয়মাবলী বা
            আমাদের পরিষেবা সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে
            যোগাযোগ করুন:
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
