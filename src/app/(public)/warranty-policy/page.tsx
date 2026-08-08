'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WarrantyPolicyPage() {
  const policies = [
    {
      num: '১',
      title: 'ওয়ারেন্টি পলিসি',
      desc: 'আমরা আন্তর্জাতিক, দেশীয় বা বাংলাদেশ ECAB এবং প্রতিটি প্রোডাক্টের জন্য নির্দিষ্ট ব্র্যান্ডের জারি করা ওয়ারেন্টি পলিসি অনুসরণ করি।',
    },
    {
      num: '২',
      title: 'প্রোডাক্ট চেক করা',
      desc: 'কাস্টমারকে প্রোডাক্ট আনবক্স করার আগে রঙ, মডেল, স্পেসিফিকেশন এবং আকার ভালোভাবে পরীক্ষা করতে হবে।',
    },
    {
      num: '৩',
      title: 'প্রোডাক্ট পরিবর্তন',
      desc: 'কাস্টমার যদি আসল প্রোডাক্টটি পরিবর্তন করতে চান তবে আপগ্রেড করার সময় যে কোনো ক্ষতি হলে তা সম্পূর্ণ তার দায়িত্ব।',
    },
    {
      num: '৪',
      title: 'পেমেন্ট পরিশোধ',
      desc: 'যেকোনো প্রোডাক্ট আনবক্স করার আগে, কাস্টমারকে চুক্তিকৃত মূল্য পরিশোধ করতে হবে। মনে রাখবেন, আনবক্স করার পর ডিল বাতিল করার কোনো বিকল্প নেই। কাস্টমার যদি অর্ডার বাতিল করতে চান তবে তাকে প্রোডাক্টের মূল্যের ২০% পরিশোধ করতে হবে।',
    },
    {
      num: '৫',
      title: 'ওয়ারেন্টি মেরামত',
      desc: 'ওয়ারেন্টি দ্বারা আচ্ছাদিত প্রোডাক্ট বিক্রির পরে কোনো ত্রুটি পাওয়া গেলে, ত্রুটি মেরামতের মাধ্যমে সরানো হয় এবং প্রোডাক্টের ধরন অনুযায়ী তা অবিলম্বে পরিবর্তন করা হয়।এছাড়াও, একটি নির্দিষ্ট মডেলের প্রোডাক্ট যদি মেরামতযোগ্য না হয় এবং আমাদের স্টকে একই বা সমতুল্য প্রোডাক্ট না থাকে তবে অবচয় এবং মূল্য সামঞ্জস্যের মাধ্যমে একটি ভাল প্রোডাক্ট প্রতিস্থাপন করা যেতে পারে।',
    },
    {
      num: '৬',
      title: 'ওয়ারেন্টি নয় এমন প্রোডাক্ট',
      desc: 'সমস্ত প্রোডাক্ট ওয়ারেন্টি সহ আসে না। ওয়ারেন্টি শুধুমাত্র সেই প্রোডাক্টগুলির জন্য বৈধ যা একটি নির্দিষ্ট সময়ের জন্য ওয়ারেন্টি সহ ক্রয় করা হয়েছে, বিল বা ইনভয়েসে উল্লিখিত অনুযায়ী।',
    },
    {
      num: '৭',
      title: 'সফটওয়্যার বা ডেটা ক্ষতি',
      desc: 'যদি প্রোডাক্টের ব্যবহার বা Jonoprio.com এর পরিষেবা চলাকালীন কোনো সফটওয়্যার বা ডেটা ক্ষতিগ্রস্ত বা হারিয়ে যায় তবে Jonoprio.com এর কোনো দায় থাকবে না। মনে রাখবেন, এই ক্ষেত্রে, Jonoprio.com ডেটা পুনরুদ্ধার বা সফটওয়্যার পুনরুদ্ধারের জন্যও দায়ী নয়।',
    },
    {
      num: '৮',
      title: 'সার্ভিস টাইম',
      desc: 'সার্ভিস কাজ সম্পন্ন করার পরে প্রোডাক্ট ফেরত দেওয়ার জন্য কোনো নির্দিষ্ট সময় নেই। ওয়ারেন্টির আওতায় নির্দিষ্ট মডেলের প্রোডাক্টের জন্য, এই সময়টি ৫-৬ দিন থেকে সর্বাধিক ৩৫-৪০ দিন বা তার বেশি হতে পারে।',
    },
    {
      num: '৯',
      title: 'ফ্লাইট / রাজনৈতিক অস্থিরতা',
      desc: 'যেমন: গ্লোবাল মহামারী বা যেকোনো রাজনৈতিক অস্থিরতা ইত্যাদি পরিস্থিতির জন্য যেখানে সমস্ত ফ্লাইট অনুমোদিত বা বন্ধ নেই এবং ওয়ারেন্টি শেষ হয়ে গেছে, Jonoprio.com কোনোভাবেই নিজ খরচে মেরামত করার দায়িত্ব নেবে, তবে প্রয়োজন হলে ২-৩ মাস সময় লাগবে।',
    },
    {
      num: '১০',
      title: 'মেরামত সংক্রান্ত তথ্য',
      desc: 'গ্রাহকদের জানানো হয় যে বেশিরভাগ ওয়ারেন্টি প্রোডাক্ট মেরামত করা হয় না; ক্ষতিগ্রস্ত অংশগুলি প্রতিস্থাপিত হয়, তবে বেশিরভাগ ক্ষেত্রে বিদেশ থেকে আমদানি করা হয়।',
    },
    {
      num: '১১',
      title: 'কাস্টমাইজড ডিভাইস ও অপারেটিং সিস্টেম',
      desc: 'বিক্রয়ের সময় কাস্টমাইজ করা ডিভাইস এবং অপারেটিং সিস্টেম ওয়ারেন্টির আওতায় পড়ে না।',
    },
    {
      num: '১২',
      title: 'পাসওয়ার্ড নিরাপত্তা',
      desc: 'Jonoprio.com ডিভাইস বা অন্যান্য প্রোডাক্ট ডেলিভারির সময় কোনো ধরনের পাসওয়ার্ড বা সিকিউরিটি কোড প্রয়োগ করে না। কাস্টমারকে সমস্ত ধরনের পাসওয়ার্ডের সম্পূর্ণ দায়িত্ব নিতে হবে। এটি ওয়ারেন্টির আওতায় থাকবে না।',
    },
    {
      num: '১৩',
      title: 'ওয়ারেন্টি মেয়াদ',
      desc: 'Jonoprio.com ওয়ারেন্টি মেয়াদ শেষ হওয়ার সময় বা পরে Jonoprio.com দ্বারা প্রদত্ত যেকোনো ফ্রি সফটওয়্যার বা হার্ডওয়্যার টিউনিংয়ের জন্য দায়ী থাকবে না।',
    },
    {
      num: '১৪',
      title: 'পরিষেবা চার্জ',
      desc: 'Jonoprio.com ওয়ারেন্টির আওতায় না থাকা যেকোনো পরিষেবার জন্য কাস্টমারের সম্মতিতে চার্জ নির্ধারণ করবে।',
    },
    {
      num: '১৫',
      title: 'সিরিয়াল বা স্টিকার ক্ষতি',
      desc: 'যদি প্রোডাক্টের সিরিয়াল/স্টিকার আংশিক বা সম্পূর্ণভাবে সরানো বা ক্ষতিগ্রস্ত হয় তবে আর ওয়ারেন্টি ক্লেইম করা যাবে না।',
    },
    {
      num: '১৬',
      title: 'স্থায়ী কালি বা ক্ষতি',
      desc: 'যদি ব্যবহারকারী প্রোডাক্টের উপর স্থায়ী কালি দিয়ে কিছু লেখেন, তবে ওয়ারেন্টি বাতিল হয়ে যাবে।',
    },
    {
      num: '১৭',
      title: 'ক্যাবল ক্ষতি',
      desc: 'প্রোডাক্টের সাথে প্রদত্ত ক্যাবলের কোনো ক্ষতি ওয়ারেন্টি দ্বারা আচ্ছাদিত নয়, এমনকি প্রোডাক্টের বৈধ ওয়ারেন্টি থাকলেও।',
    },
    {
      num: '১৮',
      title: 'রসিদ হারানো',
      desc: 'যদি কোনো নির্দিষ্ট প্রোডাক্টের ওয়ারেন্টি রসিদ হারিয়ে যায়, তবে ক্রয়ের রসিদ এবং সঠিক প্রমাণ প্রদানের শর্তে প্রোডাক্ট গ্রহণ করতে হবে।',
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
            <ShieldAlert className="w-4 h-4" />
            <span>Customer Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-title tracking-tight">
            ওয়ারেন্টি পলিসি
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

        <hr className="border-border" />

        {/* Contact Footer */}
        <footer className="pt-2 space-y-4">
          <h2 className="text-2xl font-bold text-subtitle">যোগাযোগ</h2>
          <p className="text-body text-sm md:text-base">
            এই ওয়ারেন্টি পলিসি বা আমাদের পরিষেবা সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ
            থাকলে আমাদের সাথে যোগাযোগ করুন:
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
