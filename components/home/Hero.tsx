'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id='hero'
      ref={heroRef}
      className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 sm:px-8"
    >
      <div className="text-center max-w-3xl">
        <h1 className="hero-title text-5xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Track Your Developer Journey with <span className='text-4xl sm:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400'>DevTracker</span> 🚀
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Organize your learning. Set goals. Track progress. All in one place.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
