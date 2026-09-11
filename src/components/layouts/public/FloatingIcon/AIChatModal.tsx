'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  User2,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface ProductColor {
  color: string;
  image: string | null;
  sizes: {
    size: string;
    price: number;
    specialPrice: number | null;
    stock: number;
  }[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  category: string;
  price: number;
  specialPrice: number | null;
  discount: number | null;
  stock: number;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  products?: Product[];
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'হ্যালো! 😊 Sera Place-এ স্বাগতম।  কী ধরনের পণ্য খুঁজছেন বা আপনার বাজেট কত? বলুন, আমি আপনার জন্য সেরা অপশনগুলো খুঁজে দিচ্ছি।',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─────────────────────────────────────────────
  // Scroll to bottom
  // ─────────────────────────────────────────────

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ─────────────────────────────────────────────
  // Focus input
  // ─────────────────────────────────────────────

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized]);

  // ─────────────────────────────────────────────
  // Generate AI Response
  // ─────────────────────────────────────────────

  const generateAIResponse = async (
    userMessage: string,
  ): Promise<{
    reply: string;
    products: Product[];
  }> => {
    try {
      const apiMessages = [
        ...messages.slice(-5).map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/chatbot/chat`,
        {
          messages: apiMessages,
        },
      );

      if (response.data.success && response.data.data?.reply) {
        return {
          reply: response.data.data.reply,
          products: response.data.data.products || [],
        };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('AI API error:', error);

      const lowerMessage = userMessage.toLowerCase().trim();

      if (
        lowerMessage.includes('product') ||
        lowerMessage.includes('find') ||
        lowerMessage.includes('search')
      ) {
        return {
          reply:
            'অবশ্যই! 😊 আপনি কী ধরনের পণ্য খুঁজছেন? আপনার পছন্দ বা বাজেট বললে আমি খুঁজে দিচ্ছি।',
          products: [],
        };
      }

      if (
        lowerMessage.includes('price') ||
        lowerMessage.includes('cost') ||
        lowerMessage.includes('how much')
      ) {
        return {
          reply:
            'কোনো নির্দিষ্ট পণ্যের নাম বলুন, আমি এর দাম সম্পর্কে জানাতে পারব। 😊',
          products: [],
        };
      }

      if (
        lowerMessage.includes('shipping') ||
        lowerMessage.includes('delivery')
      ) {
        return {
          reply: 'ডেলিভারি সম্পর্কে জানতে চাইলে আপনার লোকেশন জানাতে পারেন। 😊',
          products: [],
        };
      }

      if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
        return {
          reply:
            'রিটার্ন বা রিফান্ড সংক্রান্ত বিষয়ে আপনার অর্ডারের তথ্য দিলে আমি সাহায্য করতে পারব।',
          products: [],
        };
      }

      if (
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hey') ||
        lowerMessage.includes('হ্যালো') ||
        lowerMessage.includes('হাই')
      ) {
        return {
          reply: 'হ্যালো! 😊 কেমন আছেন? কী ধরনের পণ্য খুঁজছেন?',
          products: [],
        };
      }

      if (lowerMessage.includes('thank') || lowerMessage.includes('ধন্যবাদ')) {
        return {
          reply: 'আপনাকেও ধন্যবাদ! ❤️ আর কিছু জানতে চাইলে বলবেন।',
          products: [],
        };
      }

      return {
        reply:
          'অবশ্যই 😊 আপনার প্রয়োজনটা একটু বিস্তারিত বলুন, আমি সাহায্য করার চেষ্টা করছি।',
        products: [],
      };
    }
  };

  // ─────────────────────────────────────────────
  // Send Message
  // ─────────────────────────────────────────────

  const handleSendMessage = async () => {
    const trimmedMessage = inputText.trim();

    if (!trimmedMessage || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await generateAIResponse(trimmedMessage);

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: result.reply,
        sender: 'ai',
        timestamp: new Date(),
        products: result.products,
      };
      // Small natural typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 700);
    } catch (error) {
      console.error(error);

      setIsTyping(false);

      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          text: 'দুঃখিত, এই মুহূর্তে একটু সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন। 😊',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  };

  // ─────────────────────────────────────────────
  // Enter key
  // ─────────────────────────────────────────────

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ─────────────────────────────────────────────
  // Copy message
  // ─────────────────────────────────────────────

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // ─────────────────────────────────────────────
  // Format time
  // ─────────────────────────────────────────────

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ─────────────────────────────────────────────
  // Clear chat
  // ─────────────────────────────────────────────

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'হ্যালো! 😊 Sera Place-এ স্বাগতম।  কী ধরনের পণ্য খুঁজছেন বা আপনার বাজেট কত? বলুন, আমি আপনার জন্য সেরা অপশনগুলো খুঁজে দিচ্ছি।',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);

    setInputText('');
  };

  // ─────────────────────────────────────────────
  // Product URL
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // Modal Size
  // ─────────────────────────────────────────────

  const modalSize = isMaximized
    ? 'w-[calc(100vw-24px)] sm:w-[95vw] h-[calc(100vh-24px)] sm:h-[90vh] max-w-7xl'
    : isMinimized
      ? 'w-[calc(100vw-32px)] sm:w-80 h-14'
      : 'w-[calc(100vw-24px)] sm:w-[420px] h-[calc(100dvh-96px)] sm:h-[680px] max-h-[760px]';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
          }}
          className={`
            fixed
            bottom-3
            sm:bottom-24
            right-3
            sm:right-6
            z-50
            ${modalSize}
            bg-white
            rounded-md
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
            flex
            flex-col
          `}
        >
          {/* ═══════════════════════════════════════
              HEADER
          ═══════════════════════════════════════ */}

          <div className="bg-gradient-primary text-white px-3 py-3 sm:p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <User2 size={20} className="sm:w-6 sm:h-6 text-white" />

                <Sparkles
                  size={10}
                  className="absolute -top-0.5 -right-0.5 animate-pulse"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">
                  Sera Place প্রতিনিধি
                </h3>

                <p className="text-[10px] sm:text-xs text-white/80 truncate">
                  {isTyping
                    ? 'Typing...'
                    : 'Online • সবসময় সাহায্যের জন্য প্রস্তুত'}
                </p>
              </div>
            </div>

            {/* Header Controls */}

            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Minimize chat"
              >
                {isMinimized ? (
                  <Maximize2 size={16} />
                ) : (
                  <Minimize2 size={16} />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block"
                aria-label="Maximize chat"
              >
                <Maximize2 size={16} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              CHAT BODY
          ═══════════════════════════════════════ */}

          {!isMinimized && (
            <>
              {/* Messages */}

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-4 bg-gray-50">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`flex gap-2 sm:gap-3 ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {/* AI Avatar */}

                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <User2 size={15} className="text-white" />
                      </div>
                    )}

                    <div
                      className={`min-w-0 ${
                        message.sender === 'user'
                          ? 'max-w-[82%] sm:max-w-[75%]'
                          : 'max-w-[88%] sm:max-w-[85%]'
                      }`}
                    >
                      {/* Message Bubble */}

                      <div
                        className={`
                          px-3 sm:px-4
                          py-2.5
                          rounded-2xl
                          break-words
                          ${
                            message.sender === 'user'
                              ? 'bg-primary text-white rounded-br-md'
                              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                          }
                        `}
                      >
                        <p className="text-sm leading-6 whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>

                      {/* Time + Actions */}

                      <div
                        className={`flex items-center gap-1.5 mt-1 px-2 ${
                          message.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <span className="text-[10px] sm:text-xs text-gray-400">
                          {formatTime(message.timestamp)}
                        </span>

                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => copyMessage(message.text)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="Copy"
                            >
                              <Copy size={12} className="text-gray-400" />
                            </button>

                            <button
                              type="button"
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="Helpful"
                            >
                              <ThumbsUp size={12} className="text-gray-400" />
                            </button>

                            <button
                              type="button"
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="Not helpful"
                            >
                              <ThumbsDown size={12} className="text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* ═══════════════════════════════
                          PRODUCTS
                      ═══════════════════════════════ */}

                      {message.sender === 'ai' &&
                        message.products &&
                        message.products.length > 0 && (
                          <div className="mt-3 space-y-2.5">
                            <div className="flex items-center gap-1.5 px-1">
                              <ShoppingBag size={14} className="text-primary" />

                              <span className="text-xs font-semibold text-gray-700">
                                আপনার জন্য কিছু পণ্য
                              </span>
                            </div>

                            {/* Horizontal Product Scroll */}

                            <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
                              {message.products.map(product => {
                                const hasSpecialPrice =
                                  product.specialPrice !== null &&
                                  product.specialPrice < product.price;

                                return (
                                  <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="
                                        group
                                        flex-shrink-0
                                        w-[185px]
                                        sm:w-[200px]
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-sm
                                        overflow-hidden
                                        shadow-sm
                                        hover:shadow-md
                                        hover:border-primary
                                        transition-all
                                        snap-start
                                      "
                                  >
                                    {/* Product Image */}

                                    <div className="relative w-full h-[145px] sm:h-[155px] bg-gray-100 overflow-hidden">
                                      {product.thumbnail ? (
                                        <Image
                                          src={product.thumbnail}
                                          alt={product.name}
                                          fill
                                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                          className="
    object-cover
    group-hover:scale-105
    transition-transform
    duration-300
  "
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                          <ShoppingBag size={30} />
                                        </div>
                                      )}

                                      {/* Stock */}

                                      {product.stock > 0 && (
                                        <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-medium px-2 py-1 rounded-full">
                                          In Stock
                                        </span>
                                      )}

                                      {product.stock === 0 && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-medium px-2 py-1 rounded-full">
                                          Out of Stock
                                        </span>
                                      )}
                                    </div>

                                    {/* Product Info */}

                                    <div className="p-2.5">
                                      <h4 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[36px] leading-5">
                                        {product.name}
                                      </h4>

                                      <p className="text-[10px] text-gray-400 mt-1 truncate">
                                        {product.category}
                                      </p>

                                      {/* Price */}

                                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                        {hasSpecialPrice ? (
                                          <>
                                            <span className="text-sm font-bold ">
                                              ৳
                                              {product.specialPrice?.toLocaleString(
                                                'en-BD',
                                              )}
                                            </span>

                                            <span className="text-[10px] text-gray-400 line-through">
                                              ৳
                                              {product.price.toLocaleString(
                                                'en-BD',
                                              )}
                                            </span>
                                          </>
                                        ) : (
                                          <span className="text-sm font-bold ">
                                            ৳
                                            {product.price.toLocaleString(
                                              'en-BD',
                                            )}
                                          </span>
                                        )}
                                      </div>

                                      {/* View Product */}

                                      <div className="mt-2.5 flex items-center justify-between">
                                        <span className="text-[10px] font-medium text-primary">
                                          বিস্তারিত দেখুন
                                        </span>

                                        <ExternalLink
                                          size={12}
                                          className="text-primary"
                                        />
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* User Avatar */}

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* ═══════════════════════════════
                    TYPING INDICATOR
                ═══════════════════════════════ */}

                {isTyping && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex gap-2 sm:gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <User2 size={16} className="text-white" />
                    </div>

                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0ms',
                          }}
                        />

                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: '150ms',
                          }}
                        />

                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: '300ms',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ═══════════════════════════════════════
                  INPUT AREA
              ═══════════════════════════════════════ */}

              <div className="border-t border-gray-200 p-2.5 sm:p-4 bg-white flex-shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="আপনার মেসেজ লিখুন..."
                    className="
                      flex-1
                      min-w-0
                      px-3 sm:px-4
                      py-2.5
                      text-sm
                      border
                      border-gray-300
                      rounded-full
                      focus:outline-none
                      focus:ring-2
                      focus:ring-orange-400
                      focus:border-transparent
                      placeholder:text-gray-400
                    "
                    disabled={isTyping}
                  />

                  {/* Clear */}

                  <button
                    type="button"
                    onClick={clearChat}
                    className="
                      p-2
                      text-gray-400
                      hover:text-gray-600
                      hover:bg-gray-100
                      rounded-full
                      transition-colors
                      flex-shrink-0
                    "
                    title="Clear chat"
                  >
                    <RefreshCw size={17} />
                  </button>

                  {/* Send */}

                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="
                      p-2.5
                      bg-gradient-primary
                      text-white
                      rounded-full
                      hover:shadow-lg
                      transition-all
                      duration-300
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      flex-shrink-0
                    "
                    aria-label="Send message"
                  >
                    <Send size={17} />
                  </button>
                </div>

                <p className="text-[9px] sm:text-xs text-gray-400 mt-2 text-center truncate">
                  Chasma Express • আপনার পছন্দের চশমা খুঁজে পেতে আমরা আছি
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatModal;
