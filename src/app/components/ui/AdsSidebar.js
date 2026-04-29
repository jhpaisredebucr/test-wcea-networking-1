"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// SUBJECT TO CHANGE THIS!!!!
const sampleAds = [
  {
    id: 1,
    type: 'image',
    src: '/images/home-hero.png',
    alt: 'Join our community',
    link: '/home/signup',
  },
  {
    id: 2,
    type: 'image',
    src: '/images/brands/wcea-ministry.png',
    alt: 'Partner with WCEA',
    link: '/home/memberships',
  },
  {
    id: 3,
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    alt: 'Welcome video',
    link: '/',
  },
];

export default function AdsSidebar({ className = '' }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % sampleAds.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const currentAd = sampleAds[currentAdIndex];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 right-6 md:block hidden z-40 lg:right-8">
        {/* Expand button - shows when collapsed */}
        <button
          onClick={handleToggle}
          className={`absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-300 z-50 ${
            isCollapsed ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+2rem)] opacity-0'
          }`}
          aria-label="Show ads"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-4 w-full max-h-125 overflow-hidden hover:shadow-3xl transition-all duration-300 relative ${
            isCollapsed ? 'translate-x-[calc(100%+2rem)] opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="relative w-full h-90 rounded-xl overflow-hidden bg-gray-100">
            {currentAd.type === 'image' ? (
              <Image
                src={currentAd.src}
                alt={currentAd.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="300px"
              />
            ) : (
              <video
                src={currentAd.src}
                alt={currentAd.alt}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent" />
            <Link
              href={currentAd.link}
              className="absolute inset-0 block"
              aria-label={currentAd.alt}
            />
          </div>
          <button
            onClick={handleToggle}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-10"
            aria-label={isCollapsed ? "Show ads" : "Hide ads"}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-gray-500 mt-3 px-1 truncate">{currentAd.alt}</p>
          <div className="flex gap-1 justify-center cursor-pointer mt-2">
            {sampleAds.map((_, index) => (
              <button
                key={_.id}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAdIndex ? 'bg-(--primary) scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Expand button - shows when collapsed */}
        <button
          onClick={handleToggle}
          className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-300 z-50 ${
            isCollapsed ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+2rem)] opacity-0'
          }`}
          aria-label="Show ads"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div 
          className={`bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl transition-all duration-300 ${
            isCollapsed ? 'translate-y-[calc(100%+2rem)] opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
        <div 
          className={`flex items-center gap-3 rounded-xl overflow-hidden bg-linear-to-r from-(--primary)/5 to-(--secondary)/5 p-3 relative`}
        >
          <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
            {currentAd.type === 'image' ? (
              <Image
                src={currentAd.src}
                alt={currentAd.alt}
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={currentAd.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{currentAd.alt}</p>
            <Link href={currentAd.link} className="text-xs text-(--primary) underline">Learn more</Link>
          </div>
          <button
            onClick={() => setCurrentAdIndex((prev) => (prev + 1) % sampleAds.length)}
            className="text-(--primary) text-sm font-medium"
          >
            Next
          </button>
          <button
            onClick={handleToggle}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-10"
            aria-label={isCollapsed ? "Show ads" : "Hide ads"}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
