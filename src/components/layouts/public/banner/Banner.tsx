'use client';

import React, { useEffect, useState } from 'react';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Icons
import { Zap } from 'lucide-react';

/* ---------------- LEFT OFFER SLIDER ---------------- */
const offerImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=500&fit=crop',
    discount: '70% OFF',
    tag: 'Flash Sale',
    bgColor: 'from-red-600 to-orange-600',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&h=500&fit=crop',
    discount: '50% OFF',
    tag: 'Limited Time',
    bgColor: 'from-purple-600 to-pink-600',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=600&h=500&fit=crop',
    discount: '40% OFF',
    tag: 'Special Deal',
    bgColor: 'from-blue-600 to-cyan-600',
  },
];

const LeftOfferSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % offerImages.length;
        setNextIndex((next + 1) % offerImages.length);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[250px] sm:h-[350px] lg:h-[500px] overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20 z-10" />

      {offerImages.map((offer, idx) => (
        <div
          key={offer.id}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform
            ${
              idx === currentIndex
                ? 'opacity-100 scale-100 translate-x-0 z-10'
                : idx === nextIndex
                  ? 'opacity-0 scale-110 translate-x-10 z-0'
                  : 'opacity-0 scale-90 -translate-x-10 z-0'
            }`}
        >
          <img
            src={offer.url}
            alt={`Offer ${idx + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Badge */}
          <div
            className={`absolute top-4 sm:top-6 left-4 sm:left-6 z-20 transition-all duration-700
              ${idx === currentIndex ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
            `}
          >
            <div
              className={`bg-gradient-to-r ${offer.bgColor} rounded-xs px-3 sm:px-4 py-1 sm:py-2 shadow-lg`}
            >
              <p className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {offer.tag}
              </p>
            </div>
          </div>

          {/* Discount Card */}
          <div
            className={`absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 z-20 transition-all duration-700
              ${idx === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xs p-3 sm:p-4 shadow-2xl">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {offer.discount}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Limited time offer
              </p>
              <button className="mt-2 sm:mt-3 bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xs font-semibold hover:bg-orange-600 transition-all w-full">
                Grab Deal
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Progress */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-20">
        <div
          className="h-full bg-orange-500"
          style={{
            width: `${((currentIndex + 1) / offerImages.length) * 100}%`,
            transition: 'width 3s linear',
          }}
        />
      </div>
    </div>
  );
};

/* ---------------- MAIN BANNER ---------------- */
const Banner = () => {
  const slides = [
    {
      id: 1,
      image:
        'https://img.lazcdn.com/us/domino/a6b9387b-e053-430e-aacd-01969bb73c80_BD-1976-688.jpg_2200x2200q80.jpg_.avif',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&h=500&fit=crop',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=500&fit=crop',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=500&fit=crop',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row ">
          {/* LEFT */}
          <div className="w-full lg:w-[30%]">
            <LeftOfferSlider />
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[70%] hidden lg:block">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              effect="fade"
              loop
              className="h-[250px] sm:h-[350px] lg:h-[500px] rounded-xs overflow-hidden shadow-2xl"
            >
              {slides.map(slide => (
                <SwiperSlide key={slide.id}>
                  <img
                    src={slide.image}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    alt="banner"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
