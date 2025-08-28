import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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
    }
  }, []);

  return (
    <section 
      className="relative z-0 min-h-[calc(100vh-110px)] px-4 py-16 text-center md:px-8 lg:px-16 flex items-center justify-center"
    >
      {/* Desktop View */}
      <div className="hidden sm:flex flex-col items-center justify-center -mt-56">
        <h1 className="max-w-6xl text-4xl sm:text-5xl font-bold leading-tight text-primary-gray md:text-6xl lg:text-8xl xl:text-8.5xl font-display font-regular tracking-tight-medium">
          <span className="font-bold-italic block sm:inline ">Our <span className='tracking-tight-medium'>Design</span></span> <br />
          <span className="items-center whitespace-nowrap flex-wrap justify-center sm:justify-start">
            <span className="tracking-tight-extreme mr-2">that</span> 
            <img
              ref={imageRef}
              src="./lightning.png"
              width={64}
              height={64}
              alt="Battery icon"
              className="inline-block h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 cursor-pointer mx-1"
            /> 
            <span className=" ml-1">supercharge</span> 
          </span>
          <br className="hidden sm:block" />
          <span className="tracking-tight-extreme">your</span> 
          <span className=" ml-2">Brand</span>
        </h1>
      </div>
  
      {/* Mobile View */}
      <div className="flex sm:hidden flex-col items-center justify-center">
        <h1 className="max-w-sm text-4xl font-bold leading-tight text-primary-gray font-display font-regular ">
          <span className="font-bold-italic block">
            Our <span className=''>Design</span>
          </span>
          <br />
          <span className="flex items-center justify-center gap-1">
            <span className="">that</span> 
            <img
              ref={imageRef}
              src="./lightning.png"
              width={64}
              height={64}
              alt="Battery icon"
              className="inline-block h-12 w-12 cursor-pointer"
            /> 
            <span>supercharge</span> 
          </span>
          <br />
          <span className="">your</span> 
          <span className="ml-2">Brand</span>
        </h1>
      </div>
    </section>
  );
}