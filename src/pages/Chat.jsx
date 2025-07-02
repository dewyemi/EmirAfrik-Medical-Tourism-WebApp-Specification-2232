import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const { FiSend, FiBot, FiUser } = FiIcons;

const Chat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: t('chat.welcome'),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        content: "Thank you for your message! I'm here to help you with your medical tourism inquiries. Can you tell me more about what specific medical treatment you're looking for?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiBot} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {t('chat.title')}
              </h1>
              <p className="text-sm text-gray-500">
                Online • Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user'
                    ? 'bg-primary-600 ml-3'
                    : 'bg-gray-300 mr-3'
                }`}>
                  <SafeIcon 
                    icon={message.sender === 'user' ? FiUser : FiBot} 
                    className="w-4 h-4 text-white" 
                  />
                </div>

                {/* Message Bubble */}
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <SafeIcon icon={FiBot} className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('chat.ai_thinking')}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isTyping}
              />
            </div>
            <Button 
              type="submit" 
              disabled={!inputMessage.trim() || isTyping}
              className="px-6"
            >
              <SafeIcon icon={FiSend} className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">
                {t('chat.send')}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;