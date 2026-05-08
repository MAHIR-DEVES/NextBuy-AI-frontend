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
} from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm NextBuy AI, your personal shopping assistant. How can I help you today? I can help you find products, answer questions about our services, or assist with your shopping experience.",
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Prepare messages in the format expected by the API
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

      // Call the real chatbot API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/chatbot/chat`,
        { messages: apiMessages },
      );

      if (response.data.success && response.data.data?.reply) {
        return response.data.data.reply;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('AI API error:', error);

      // Fallback responses based on keywords
      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes('product') ||
        lowerMessage.includes('find') ||
        lowerMessage.includes('search')
      ) {
        return "I can help you find products! You can browse our categories or tell me what you're looking for. What type of product are you interested in?";
      }

      if (
        lowerMessage.includes('price') ||
        lowerMessage.includes('cost') ||
        lowerMessage.includes('how much')
      ) {
        return "Our prices vary by product. You can see the price of any item on its product page. Is there a specific product you'd like to know about?";
      }

      if (
        lowerMessage.includes('shipping') ||
        lowerMessage.includes('delivery')
      ) {
        return 'We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Free shipping is available on orders over $50. Would you like more details?';
      }

      if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
        return 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Need help with a specific return?';
      }

      if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        return "I'm here to help! I can assist with finding products, answering questions about orders, shipping, returns, and general shopping inquiries. What do you need help with?";
      }

      if (
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hey')
      ) {
        return 'Hello! How can I assist you with your shopping today?';
      }

      if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
      }

      return (
        'I understand you\'re asking about: "' +
        userMessage +
        "\". I'm here to help with product recommendations, order questions, and shopping assistance. Could you provide more details about what you'd like to know?"
      );
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputText);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setTimeout(
        () => {
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);
        },
        1000 + Math.random() * 1000,
      );
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm NextBuy AI, your personal shopping assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  const modalSize = isMaximized
    ? 'w-[95vw] h-[90vh] max-w-7xl'
    : isMinimized
      ? 'w-80 h-14'
      : 'w-96 h-[600px]';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed bottom-24 right-6 z-50 ${modalSize} bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot size={24} />
                <Sparkles
                  size={12}
                  className="absolute -top-1 -right-1 animate-pulse"
                />
              </div>
              <div>
                <h3 className="font-semibold">NextBuy AI</h3>
                <p className="text-xs text-orange-100">
                  {isTyping ? 'Typing...' : 'Online • Always here to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 size={18} />
                ) : (
                  <Minimize2 size={18} />
                )}
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Maximize2 size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyMessage(message.text)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy size={12} className="text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <ThumbsUp size={12} className="text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <ThumbsDown size={12} className="text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => clearChat()}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear chat"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Powered by NextBuy AI • Your personal shopping assistant
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
