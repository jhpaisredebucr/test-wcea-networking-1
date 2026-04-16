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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % sampleAds.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentAd = sampleAds[currentAdIndex];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 right-6 w-52 md:block hidden z-40 lg:right-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-4 w-full max-h-125 overflow-hidden hover:shadow-3xl transition-all duration-300">
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
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl">
        <div className="flex items-center gap-3 rounded-xl overflow-hidden bg-linear-to-r from-(--primary)/5 to-(--secondary)/5 p-3">
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
        </div>
      </div>
    </>
  );
}
