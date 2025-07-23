'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Rocket, Github, Twitter, Linkedin, Zap } from 'lucide-react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.from(footerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      });

      // Links stagger animation
      gsap.from(linksRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: 'back.out(1.2)'
      });

      // Floating particles animation
      particleRefs.current.forEach((particle, i) => {
        if (!particle) return;
        gsap.to(particle, {
          y: Math.random() * 30 - 15,
          x: Math.random() * 20 - 10,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Gradient background animation
      gsap.to('.footer-gradient', {
        x: 30,
        y: -20,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-t border-gray-800"
    >
      {/* Animated gradient background */}
      <div className="footer-gradient absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-20 h-20 text-amber-300" />
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              DevTracker
            </span>
          </div>
          <p className="text-gray-400 max-w-md text-center">
            The ultimate platform to track, learn and master developer skills.
          </p>
        </div>

        {/* CTA and social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
              ref={el => { linksRef.current[5] = el; }}
            className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-px rounded-lg"
          >
            <Link
              href="/auth/register"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-lg text-white font-medium hover:bg-transparent transition-all"
            >
              <Zap className="w-5 h-5" />
              Start Tracking For Free
            </Link>
          </div>

          <div 
            ref={el => { linksRef.current[5] = el; }}
            className="flex items-center gap-6"
          >
            {[
              { icon: <Github className="w-5 h-5" />, href: "https://github.com/surajshinde87" },
              { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/surajshinde_87" },
              { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/surajshinde87" }
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="text-gray-400 hover:text-white hover:scale-110 transform transition-transform"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DevTracker. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => { particleRefs.current[i] = el; }}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
}