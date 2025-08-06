import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      // Split text into individual words and wrap them in spans
      const textElements = heroRef.current!.querySelectorAll('.animate-text');
      
      textElements.forEach((element: Element) => {
        const text = element.textContent || '';
        const words = text.split(' ');
        element.innerHTML = words.map(word => `<span class="word inline-block">${word}</span>`).join(' ');
      });

      // Get all word spans
      const wordSpans = heroRef.current!.querySelectorAll('.word');
      
      // Set initial state - words start invisible and slightly below
      gsap.set(wordSpans, {
        opacity: 0,
        y: 30,
        scale: 0.8
      });

      // Main entrance animation - clean and smooth
      gsap.to(wordSpans, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      });

      // Subtle breathing animation for all words except "Our Design"
      const nonDesignWords = Array.from(wordSpans).filter((word: Element) => 
        !word.closest('.font-semibold-italic')
      );
      
      gsap.to(nonDesignWords, {
        scale: 1.02,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          repeat: -1,
          yoyo: true
        }
      });

      // Individual word hover effects with responsive scaling
      wordSpans.forEach((word: Element) => {
        const wordElement = word as HTMLElement;
        let hoverTl = gsap.timeline({ paused: true });
        
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        const hoverScale = isMobile ? 1.05 : 1.1;
        const hoverY = isMobile ? -4 : -8;
        
        hoverTl.to(wordElement, {
          scale: hoverScale,
          y: hoverY,
          color: "#3b82f6",
          textShadow: "0 4px 8px rgba(59, 130, 246, 0.3)",
          duration: 0.4,
          ease: "power2.out"
        });

        // Use both touch and mouse events for better mobile support
        const enterHandler = () => hoverTl.play();
        const leaveHandler = () => hoverTl.reverse();
        
        wordElement.addEventListener('mouseenter', enterHandler);
        wordElement.addEventListener('mouseleave', leaveHandler);
        wordElement.addEventListener('touchstart', enterHandler);
        wordElement.addEventListener('touchend', leaveHandler);

        // Random subtle glitch effect (reduced on mobile)
        if (Math.random() > (isMobile ? 0.8 : 0.7)) {
          gsap.to(wordElement, {
            skewX: isMobile ? 1 : 2,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
            delay: Math.random() * 5 + 3,
            ease: "power2.inOut"
          });
        }
      });

      // Special animation for "Our Design" - just the rotation, no scale
      const ourDesignWords = heroRef.current!.querySelectorAll('.font-semibold-italic .word');
      ourDesignWords.forEach((word: Element) => {
        gsap.to(word, {
          rotation: 0.5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Image shake animation every 1 second with enhanced effects
      if (imageRef.current) {
        const shakeTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
        
        shakeTimeline
          .to(imageRef.current, {
            x: -4,
            y: 2,
            rotation: -2,
            duration: 0.04
          })
          .to(imageRef.current, {
            x: 4,
            y: -2,
            rotation: 2,
            duration: 0.04
          })
          .to(imageRef.current, {
            x: -3,
            y: 1,
            rotation: -1,
            duration: 0.04
          })
          .to(imageRef.current, {
            x: 3,
            y: -1,
            rotation: 1,
            duration: 0.04
          })
          .to(imageRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.08,
            ease: "power2.out"
          });

        // Continuous glow effect for image (no brightness change)
        gsap.to(imageRef.current, {
          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Magnetic effect for "supercharge" word (responsive)
      const superchargeSpan = heroRef.current!.querySelector('.supercharge-word');
      if (superchargeSpan) {
        const isMobile = window.innerWidth < 768;
        gsap.to(superchargeSpan, {
          x: isMobile ? 2 : 5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative z-0 min-h-[calc(100vh-110px)] px-4 py-16 text-center md:px-8 lg:px-16 flex items-center justify-center"
    >
      {/* Desktop View */}
      <div className="hidden sm:flex flex-col items-center justify-center -mt-56">
        <h1 className="max-w-6xl text-4xl sm:text-5xl font-bold leading-tight text-primary-gray md:text-6xl lg:text-8xl xl:text-8.5xl font-display font-regular tracking-tight-medium">
          <span className="animate-text font-semibold-italic block sm:inline">Our Design</span>
          <span className="inline-flex items-center whitespace-nowrap flex-wrap justify-center sm:justify-start">
            <span className="animate-text tracking-tight-extreme mr-2">that</span> 
            <img
              ref={imageRef}
              src="./lightning.png"
              width={64}
              height={64}
              alt="Battery icon"
              className="inline-block h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 cursor-pointer mx-1"
            /> 
            <span className="animate-text supercharge-word ml-1">supercharge</span> 
          </span>
          <br className="hidden sm:block" />
          <span className="animate-text tracking-tight-extreme">your</span> 
          <span className="animate-text ml-2">Brand</span>
        </h1>
      </div>
  
      {/* Phone View */}
      <div className="flex sm:hidden flex-col items-center justify-center text-primary-gray">
        <h1 className="text-6xl font-bold leading-snug font-display">
          <span className="block text-5xl animate-text font-semibold-italic">Our Design</span>
          <span className="mt-2 text-5xl animate-text font-bold leading-snug font-display">
            that {" "}
            <img
              src="./lightning.png"
              alt="Battery icon"
              className="inline-block h-20 w-20 mx-1 align-middle"
            /> 
            <span className="text-5xl animate-text font-bold leading-snug font-display">supercharge</span>
          </span>
          <br />
          <h1 className='text-5xl animate-text font-bold leading-snug font-display'>your Brand</h1>
        </h1>
      </div>
    </section>
  );
  
}