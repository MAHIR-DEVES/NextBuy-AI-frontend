import { ProductCard1 } from '@/components/product-card1';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Yawell Premium Speaker',
      image: {
        src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        alt: 'Yawell Speaker',
      },
      link: '#',
      description: 'High-quality portable speaker with deep bass sound.',
      price: {
        regular: 493.15,
        sale: 463.18,
        currency: 'USD',
      },
      badge: {
        text: 'Hot Deal',
        backgroundColor: 'oklch(50.5% 0.213 27.518)',
      },
      rating: 4.84,
      moq: 200,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      image: {
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        alt: 'Smart Watch',
      },
      link: '#',
      description: 'Track your fitness and notifications in real-time.',
      price: {
        regular: 145.05,
        sale: 116.04,
        currency: 'USD',
      },
      badge: {
        text: 'Best Seller',
        backgroundColor: 'oklch(55% 0.2 220)',
      },
      rating: 4.7,
      moq: 2,
    },
    {
      id: 3,
      name: 'Wireless Earbuds X',
      image: {
        src: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=300&h=300&fit=crop',
        alt: 'Earbuds',
      },
      link: '#',
      description: 'Noise cancelling earbuds with crystal clear sound.',
      price: {
        regular: 110.0,
        sale: 88.0,
        currency: 'USD',
      },
      badge: {
        text: 'New',
        backgroundColor: 'oklch(65% 0.25 140)',
      },
      rating: 4.9,
      moq: 1,
    },
    {
      id: 4,
      name: 'Smart Home Speaker',
      image: {
        src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        alt: 'Smart Speaker',
      },
      link: '#',
      description: 'AI-powered smart speaker for home automation.',
      price: {
        regular: 1271.56,
        sale: 1017.25,
        currency: 'USD',
      },
      badge: {
        text: 'Limited',
        backgroundColor: 'oklch(60% 0.2 60)',
      },
      rating: 4.6,
      moq: 5,
    },
    {
      id: 5,
      name: 'Fitness Tracker Band',
      image: {
        src: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=300&h=300&fit=crop',
        alt: 'Fitness Tracker',
      },
      link: '#',
      description: 'Track your steps, sleep and health metrics easily.',
      price: {
        regular: 725.23,
        sale: 580.18,
        currency: 'USD',
      },
      badge: {
        text: 'Discount',
        backgroundColor: 'oklch(58% 0.22 30)',
      },
      rating: 4.5,
      moq: 10,
    },
    {
      id: 6,
      name: 'Fitness Tracker Band',
      image: {
        src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        alt: 'Fitness Tracker',
      },
      link: '#',
      description: 'Track your steps, sleep and health metrics easily.',
      price: {
        regular: 725.23,
        sale: 580.18,
        currency: 'USD',
      },
      badge: {
        text: 'Discount',
        backgroundColor: 'oklch(58% 0.22 30)',
      },
      rating: 4.5,
      moq: 10,
    },
  ];
  return (
    <div className="w-full pb-10 bg-white">
      <div className="container mx-auto  md:px-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Just For You
            </h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {products.map(product => (
            <ProductCard1 key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
