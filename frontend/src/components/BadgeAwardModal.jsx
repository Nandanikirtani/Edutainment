import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const BadgeAwardModal = ({ isOpen, onClose, badge }) => {
  useEffect(() => {
    if (isOpen && badge) {
      // Trigger celebration confetti
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 100 * (timeLeft / duration);
        
        // Gold and colorful confetti
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#4169E1', '#FF69B4']
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#4169E1', '#FF69B4']
        }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen, badge]);

  if (!badge) return null;

  const badgeImage = `/Badge-${badge.badgeType}.${badge.badgeType === '50' ? 'jpeg' : 'jpg'}`;
  const shareText = `🎉 I just earned a ${badge.badgeType}% completion badge for "${badge.courseName}" on Manav Rachna Edutainment! 🏆\n\nJoin me in learning at Manav Rachna Edutainment Website! 📚✨`;
  const shareUrl = window.location.origin;

  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct web sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(shareText + '\n\n' + shareUrl);
        alert('Text copied to clipboard! You can now paste it on Instagram 📋');
        return;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = badgeImage;
    link.download = `Badge-${badge.badgeType}-${badge.courseName.replace(/\s+/g, '-')}.${badge.badgeType === '50' ? 'jpeg' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9998] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-br from-gray-900 via-red-950/30 to-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 border-2 border-yellow-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center space-y-6">
              {/* Congratulations Header */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-2">
                  🎉 Congratulations! 🎉
                </h2>
                <p className="text-xl text-white font-semibold">
                  You've Earned a Badge!
                </p>
              </motion.div>

              {/* Badge Image */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.img
                    src={badgeImage}
                    alt={`${badge.badgeType}% Badge`}
                    className="w-48 h-48 object-contain drop-shadow-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      filter: [
                        'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                        'drop-shadow(0 0 40px rgba(255, 215, 0, 0.8))',
                        'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur-2xl opacity-30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Badge Info */}
              <div className="space-y-2">
                <p className="text-2xl font-bold text-yellow-400">
                  {badge.badgeType}% Completion Badge
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">{badge.courseName}</span>
                </p>
                <p className="text-sm text-gray-400">
                  You've completed {badge.completionPercentage}% of this course!
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105"
              >
                📥 Download Badge
              </button>

              {/* Share Section */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">Share Your Achievement</span>
                </div>
                
                <div className="flex justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('facebook')}
                    className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-lg"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('whatsapp')}
                    className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors shadow-lg"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('linkedin')}
                    className="p-3 bg-blue-700 hover:bg-blue-800 rounded-full transition-colors shadow-lg"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('instagram')}
                    className="p-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 rounded-full transition-colors shadow-lg"
                    title="Copy for Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors mt-4"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeAwardModal;
