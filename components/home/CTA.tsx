'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {Zap, LineChart, BookMarked, BrainCircuit } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rocketRef.current, {
        y: 100,
        opacity: 0,
        rotate: 15,
        duration: 1.5,
        delay: 0.3,
        ease: 'back.out(1.7)',
      });

      gsap.to('.rocket-flame', {
        scaleY: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      featureCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.7 + i * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          scale: 1.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      particlesRef.current.forEach((particle) => {
        if (!particle) return;
        gsap.to(particle, {
          y: Math.random() * 40 - 20,
          x: Math.random() * 40 - 20,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5,
          ease: 'sine.inOut',
        });
      });

      gsap.to('.gradient-bg-1', {
        x: 50,
        y: -30,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.gradient-bg-2', {
        x: -30,
        y: 20,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <LineChart className="text-purple-500 dark:text-purple-400 w-5 h-5 md:w-6 md:h-6" />,
      title: 'Smart Dashboard',
      items: [
        'Performance metrics & progress charts',
        'Daily revision with spaced repetition',
        'Streak calendar & task management',
      ],
      color: 'purple',
    },
    {
      icon: <BookMarked className="text-blue-500 dark:text-blue-400 w-5 h-5 md:w-6 md:h-6" />,
      title: 'Learning System',
      items: [
        'Visual roadmap with progress tracking',
        'AI-powered notes with resources',
        'Practice with instant AI feedback',
      ],
      color: 'blue',
    },
    {
      icon: <BrainCircuit className="text-cyan-500 dark:text-cyan-400 w-5 h-5 md:w-6 md:h-6" />,
      title: 'AI Assistance',
      items: [
        '24/7 mentor for your questions',
        'Debug code & explain concepts',
        'Generate interview questions',
      ],
      color: 'cyan',
    },
  ];

  return (
    <section
      id="why-devtracker"
      ref={containerRef}
      className="relative py-12  bg-white dark:bg-black overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#6c4bc8]/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#6c4bc8]/20 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-10">
        {/* Rocket */}
        <div ref={rocketRef} className="inline-block mb-6 md:mb-8 transform transition-transform hover:scale-110">
          <div className="relative">
            <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-amber-400/20 rounded-full blur-md"></div>
            <div className="rocket-flame absolute -bottom-3 md:-bottom-4 left-1/4 w-1/2 h-2 md:h-3 bg-gradient-to-t from-amber-400 to-transparent rounded-full blur-[2px] origin-bottom"></div>
          </div>
        </div>

        {/* Heading */}
        <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 px-2">
          Supercharge Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 animate-text-shimmer bg-[length:250%_100%]">
            Developer Journey
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 md:mb-14 relative px-4">
          <span className="relative z-10">Track, learn, and master skills with our all-in-one developer growth platform powered by AI.</span>
          <span className="absolute -bottom-8 left-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 w-full"></span>
        </p>

        {/* Features */}
        <div className="mt-12 md:mt-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={el =>{ featureCardsRef.current[i] = el}}
              className={`bg-white dark:bg-gray-800/30 p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
            >
              <h3 className="flex items-center gap-3 text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.icon}
                {feature.title}
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm md:text-base">
                {feature.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={`text-${feature.color}-500 dark:text-${feature.color}-400 mt-1`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="flex justify-center mt-12 md:mt-16 px-4">
          <Link
            href="/auth/register"
            ref={ctaRef}
            className="relative group px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 text-sm md:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              Start Tracking For Free
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></span>
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></span>
          </Link>
        </div> */}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            ref={el =>{ particlesRef.current[i] = el}}
            className="absolute rounded-full bg-black/5 dark:bg-white/5"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-purple-500/5 blur-[80px] md:blur-[100px]"></div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(15px); }
        }
        .animate-text-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </section>
  );
}
