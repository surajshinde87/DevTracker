'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      gsap.to('.floating', {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);
  }, []);

  const gradientStyle = {
    backgroundImage: isDarkMode
      ? 'linear-gradient(178deg, #0c0614, #1c0f2b)'
      : 'linear-gradient(178deg, #f7f5fa, #6c4bc8)',
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={gradientStyle}
      className="flex items-center justify-center px-6 sm:px-12 py-4
                 text-center sm:text-left transition-colors duration-300"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Text Content */}
        <div>
          <h1 className="hero-fade text-5xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white leading-tight">
            Track Your Developer Journey with <br />
            <span className="text-transparent text-7xl py-4 mt-1 bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600 drop-shadow">
              DevTracker 
            </span>
          </h1>

          <p className="hero-fade font-bold text-3xl text-gray-800 dark:text-gray-300 max-w-xl leading-relaxed">
            <Typewriter
              words={[
                'Organize your skills.',
                'Set smart goals.',
                'Track your progress.',
                'Crack tech interviews!',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </p>

          <p className="hero-fade text-lg sm:text-xl text-gray-800 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
            Organize your skills. Set goals. Track progress. Crack interviews. All in one place — built for modern developers.
          </p>

          <div className="hero-fade flex flex-col sm:flex-row justify-start items-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl font-semibold text-white 
                         bg-[#6c4bc8] hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
            Start Tracking Now
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hero-fade flex justify-center floating">
          <Image
            src="/Landing_Page/heroillustratation.png"
            alt="DevTracker Illustration"
            width={420}
            height={420}
            priority
            className="rounded-lg drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
