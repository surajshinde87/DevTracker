'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  LayoutDashboard,
  TrendingUp,
  BookMarked,
  Bot,
  Code2,
  Settings,
} from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
    title: 'Dashboard',
    desc: 'Performance metrics, progress charts, daily revision, ongoing tasks, streak calendar, and upcoming tasks',
    color: 'border-purple-500',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
    title: 'My Progress',
    desc: 'Visual roadmap tracking, completed topics, improvement areas, and multi-role roadmaps',
    color: 'border-blue-500',
  },
  {
    icon: <BookMarked className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />,
    title: 'My Notes',
    desc: 'AI-powered notes with topics, resources, tags, attachments, and diagrams',
    color: 'border-emerald-500',
  },
  {
    icon: <Bot className="w-8 h-8 text-amber-500 dark:text-amber-400" />,
    title: 'AI Mentor',
    desc: 'Chat-based guidance for your skills roadmap, notes, and technical doubts',
    color: 'border-amber-500',
  },
  {
    icon: <Code2 className="w-8 h-8 text-red-500 dark:text-red-400" />,
    title: 'Practice',
    desc: 'Theory questions with AI feedback on your answers and improvement areas',
    color: 'border-red-500',
  },
  {
    icon: <Settings className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />,
    title: 'Settings',
    desc: 'Edit roadmaps, share progress, view badges, and manage personal info',
    color: 'border-cyan-500',
  },
];

export default function Features() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Entry animation
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    // 3D tilt effect
    cardsRef.current.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 15;
        const angleY = (centerX - x) / 15;

        gsap.to(card, {
          rotationX: angleX,
          rotationY: angleY,
          transformPerspective: 1000,
          transformOrigin: 'center center',
          duration: 0.5,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
        });
      });
    });

    // Border animation
    const borderTimelines = cardsRef.current.map((card) => {
      const tl = gsap.timeline({ repeat: -1 });
      const border = card.querySelector('.animated-border');
      tl.to(border, {
        backgroundPosition: '200% 0',
        duration: 3,
        ease: 'linear',
      });
      return tl;
    });

    return () => {
      borderTimelines.forEach((tl) => tl.kill());
    };
  }, []);

  return (
    <section id="features" className="relative py-6 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#6c4bc8]/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#6c4bc8]/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Complete{' '}
            <span className="bg-clip-text text-transparent bg-[#6c4bc8]">
              Developer Growth Suite
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to track, improve, and master your development skills in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className={`relative p-0.5 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] ${feature.color}`}
            >
              <div className="animated-border absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/20 bg-[length:200%_100%] z-0 rounded-xl" />
              <div
                className="relative bg-white dark:bg-gray-900/80 backdrop-blur-md shadow-xl dark:shadow-2xl p-6 rounded-xl h-full z-10"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-800 shadow-inner dark:shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
