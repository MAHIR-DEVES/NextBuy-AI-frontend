'use client';

import React, { useState } from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import AIChatModal from './AIChatModal';

const FloatingIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    const phoneNumber = '1234567890';
    const message = 'Hello! I need help with my order.';
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group"
          title="Contact us on WhatsApp"
        >
          <FaWhatsapp size={30} />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Support
          </span>
        </button>

        {/* AI Chat Bot */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group relative"
          title="Chat with AI Assistant"
        >
          <RiRobot2Fill size={30} />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant
          </span>
          {/* Pulse animation for bot icon */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 animate-ping opacity-75"></div>
        </button>
      </div>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingIcon;
