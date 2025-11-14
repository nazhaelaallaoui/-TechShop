import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
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

  const botResponses = {
    greeting: [
      "Bonjour ! Comment allez-vous ?",
      "Salut ! Ravi de vous aider !",
      "Bonjour ! Que puis-je faire pour vous ?"
    ],
    products: [
      "Nous avons une large gamme de produits : smartphones, ordinateurs, audio, accessoires...",
      "Découvrez nos dernières nouveautés en matière de technologie !",
      "Tous nos produits sont garantis et livrés rapidement."
    ],
    shipping: [
      "La livraison est gratuite dès 50€ d'achat !",
      "Nous livrons en 24-48h en France métropolitaine.",
      "Suivi de commande disponible en temps réel."
    ],
    payment: [
      "Nous acceptons CB, PayPal et paiement à la livraison.",
      "Paiement 100% sécurisé SSL.",
      "Possibilité de payer en plusieurs fois."
    ],
    support: [
      "Notre équipe est disponible du lundi au samedi.",
      "Contactez-nous par email ou téléphone.",
      "Consultez notre FAQ pour des réponses rapides."
    ],
    default: [
      "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?",
      "Désolé, je n'ai pas la réponse à cette question.",
      "Laissez-moi vous mettre en relation avec un conseiller humain.",
      "Essayez de consulter notre section aide ou contactez-nous directement."
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }

    if (message.includes('produit') || message.includes('acheter') || message.includes('prix')) {
      return botResponses.products[Math.floor(Math.random() * botResponses.products.length)];
    }

    if (message.includes('livraison') || message.includes('livre') || message.includes('expédi')) {
      return botResponses.shipping[Math.floor(Math.random() * botResponses.shipping.length)];
    }

    if (message.includes('paiement') || message.includes('payer') || message.includes('carte')) {
      return botResponses.payment[Math.floor(Math.random() * botResponses.payment.length)];
    }

    if (message.includes('aide') || message.includes('support') || message.includes('contact')) {
      return botResponses.support[Math.floor(Math.random() * botResponses.support.length)];
    }

    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Voir les produits",
    "Suivi de commande",
    "Support client",
    "Modes de paiement"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(97, 218, 251, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        title="Ouvrir le chat"
      >
        <span style={{ fontSize: '1.5rem' }}>💬</span>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '500px',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,240,240,0.95))',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🤖</span>
          <div>
            <div style={{ fontWeight: '600' }}>Assistant TechShop</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              {t('online')}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}
          >
            <div style={{
              background: message.sender === 'user'
                ? 'linear-gradient(45deg, #61dafb, #21b4d6)'
                : 'rgba(255,255,255,0.9)',
              color: message.sender === 'user' ? 'white' : '#333',
              padding: '0.75rem 1rem',
              borderRadius: message.sender === 'user'
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              wordWrap: 'break-word'
            }}>
              {message.text}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: '#999',
              marginTop: '0.25rem',
              textAlign: message.sender === 'user' ? 'right' : 'left'
            }}>
              {message.timestamp.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '0.75rem 1rem',
              borderRadius: '18px 18px 18px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Typing</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <div className="typing-dot" style={{
                    width: '4px',
                    height: '4px',
                    background: '#61dafb',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite'
                  }} />
                  <div className="typing-dot" style={{
                    width: '4px',
                    height: '4px',
                    background: '#61dafb',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite 0.2s'
                  }} />
                  <div className="typing-dot" style={{
                    width: '4px',
                    height: '4px',
                    background: '#61dafb',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite 0.4s'
                  }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div style={{
          padding: '0 1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              style={{
                background: 'rgba(97, 218, 251, 0.1)',
                border: '1px solid #61dafb',
                color: '#61dafb',
                padding: '0.5rem 0.75rem',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('typeMessage')}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          style={{
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: inputMessage.trim() && !isTyping ? 1 : 0.5
          }}
        >
          ➤
        </button>
      </div>

      {/* Typing Animation CSS */}
      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
