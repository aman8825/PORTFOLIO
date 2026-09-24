import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HorizontalCarousel = ({ items, renderItem, keyExtractor, ariaLabel }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      
      // Calculate current index
      if (items.length > 0) {
        // Find the first child to get exact card width
        const firstChild = scrollRef.current.firstElementChild;
        if (firstChild) {
          const itemWidth = firstChild.offsetWidth + 32; // 32px is gap-8
          const newIndex = Math.min(
            items.length - 1,
            Math.max(0, Math.round(scrollLeft / itemWidth))
          );
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scrollBy = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild;
      if (firstChild) {
        const scrollAmount = firstChild.offsetWidth + 32;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      } else {
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -clientWidth : clientWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  if (!items || items.length === 0) return null;

  const displayIndex = String(currentIndex + 1).padStart(2, '0');
  const totalItems = String(items.length).padStart(2, '0');

  return (
    <div className="w-full flex flex-col relative group">
      {/* Navigation and Progress Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-primary/70 font-mono text-sm">
          <span>{displayIndex}</span>
          <span className="text-primary/30">/</span>
          <span>{totalItems}</span>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => scrollBy('left')}
            disabled={!canScrollLeft}
            aria-label="Previous item"
            className={`p-2 rounded-full border border-border/50 bg-surface/50 transition-all ${
              canScrollLeft 
                ? 'hover:bg-primary/10 hover:border-primary/30 text-primary cursor-pointer' 
                : 'opacity-30 cursor-not-allowed text-primary/50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollBy('right')}
            disabled={!canScrollRight}
            aria-label="Next item"
            className={`p-2 rounded-full border border-border/50 bg-surface/50 transition-all ${
              canScrollRight 
                ? 'hover:bg-primary/10 hover:border-primary/30 text-primary cursor-pointer' 
                : 'opacity-30 cursor-not-allowed text-primary/50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 pt-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          aria-label={ariaLabel}
        >
          {items.map((item, index) => (
            <div 
              key={keyExtractor(item)} 
              className="snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-[380px] lg:w-[420px] flex flex-col h-full"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto h-[2px] bg-border/30 rounded-full mt-2 overflow-hidden hidden md:block">
        <motion.div 
          className="h-full bg-primary/50"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentIndex + 1) / items.length) * 100}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
