'use client';

import { FaUserPlus, FaBrain, FaTasks, FaClipboardList, FaBolt, FaChartLine, FaRobot } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  leftImage: string;
  rightImage: string;
}

const steps: Step[] = [
  {
    title: "Sign up & choose your role",
    description: "Select from Frontend, Backend, Full Stack, DevOps, or create custom role. Our system adapts to your chosen path and provides tailored content.",
    icon: <FaUserPlus className="text-fuchsia-400 text-4xl" />,
    leftImage: "/how-it-works/select.png",
    rightImage: "/how-it-works/role.png"
  },
  {
    title: "Skill assessment",
    description: "Comprehensive evaluation to identify your strengths and gaps. We analyze 50+ skills across your domain to build the perfect learning path.",
    icon: <FaBrain className="text-fuchsia-400 text-4xl" />,
    leftImage: "/how-it-works/skill-assessment.png",
    rightImage: "/how-it-works/skill-assessment2.png"
  },
  {
   title: "AI generates your roadmap",
    description: "Get structured learning path with mandatory skills (HTML, CSS, JS) and optional specialties (Three.js, WebGL)",
    icon: <FaTasks className="text-fuchsia-400 text-4xl" />,
    leftImage: "/how-it-works/roadmap.png",
    rightImage: "/how-it-works/roadmap2.png"
  },
   {
    title: "Track progress & take notes",
    description: "Organize resources by topic, attach diagrams, and tag concepts for easy review",
    icon: <FaClipboardList className="text-fuchsia-400 text-4xl" />,
    leftImage: "/how-it-works/progress.png",
    rightImage: "/how-it-works/progress2.png"
  },
   {
    title: "Daily AI-powered revision",
    description: "Smart flashcards and spaced repetition quizzes based on your weak areas",
    icon: <FaBolt className="text-fuchsia-400 text-4xl" />,
     leftImage: "/how-it-works/revision.png",
    rightImage: "/how-it-works/revision2.png"
  },

   {
    title: "Practice with feedback",
    description: "Answer theory questions and get AI evaluation with improvement suggestions",
    icon: <MdQuiz className="text-fuchsia-400 text-4xl" />,
     leftImage: "/how-it-works/feedback.png",
    rightImage: "/how-it-works/feedback2.png"
  },
    {
    title: "Progress analytics",
    description: "Visual charts show completion, streaks, and skill mastery over time",
    icon: <FaChartLine className="text-fuchsia-400 text-4xl" />,
      leftImage: "/how-it-works/dashboard.png",
    rightImage: "/how-it-works/dashboard2.png"
  },
    {
    title: "24/7 AI mentor",
    description: "Ask about concepts, debug code, or generate interview questions for any topic",
    icon: <FaRobot className="text-fuchsia-400 text-4xl" />,
     leftImage: "/how-it-works/ai-chat.png",
    rightImage: "/how-it-works/ai-chat2.png"
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="relative bg-gray-950 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400">
          Your Developer Growth Journey
        </h2>

        <div className="flex flex-col gap-16">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              step={step} 
              index={index} 
              totalSteps={steps.length} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index, totalSteps }: { step: Step, index: number, totalSteps: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const leftImg = leftImageRef.current;
    const rightImg = rightImageRef.current;

    // Set initial state with 3D perspective
    gsap.set(card, {
      opacity: 0,
      y: 80,
      rotateX: 10,
      transformStyle: 'preserve-3d',
      transformPerspective: 1200
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 50%",
        scrub: 0.7,
        toggleActions: "play none none none"
      }
    });

    tl.to(card, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: "back.out(1.4)",
      delay: index * 0.15
    });

    // Enhanced hover animation with 3D tilt
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        rotateY: index % 2 === 0 ? 5 : -5,
        rotateX: 3,
        scale: 1.02,
        boxShadow: "0 30px 60px -15px rgba(217, 70, 239, 0.3)",
        duration: 0.4
      });
      
      if (leftImg) gsap.to(leftImg, { x: -10, duration: 0.6 });
      if (rightImg) gsap.to(rightImg, { x: 10, duration: 0.6 });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.5
      });
      
      if (leftImg) gsap.to(leftImg, { x: 0, duration: 0.5 });
      if (rightImg) gsap.to(rightImg, { x: 0, duration: 0.5 });
    });

    return () => {
      tl.kill();
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="relative bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 overflow-hidden group h-full min-h-[300px]"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Image */}
        <div 
          ref={leftImageRef}
          className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10"></div>
          <Image
            src={step.leftImage}
            alt={`${step.title} - Before`}
            width={600}
            height={400}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            quality={90}
            priority={index < 2}
          />
        
        </div>

        {/* Content Section */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex items-start gap-6 mb-6">
            <div className="p-3 bg-gray-800 rounded-xl border border-fuchsia-500/30 group-hover:bg-fuchsia-500/10 group-hover:border-fuchsia-500/50 transition-colors duration-300 flex-shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="text-fuchsia-400">Step {index + 1}:</span> {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-2 mt-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-full"
              style={{ width: `${(index / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Image */}
        <div 
          ref={rightImageRef}
          className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-blue-500/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10"></div>
          <Image
            src={step.rightImage}
            alt={`${step.title} - After`}
            width={600}
            height={400}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            quality={90}
            priority={index < 2}
          />
        </div>
      </div>

      {/* 3D edge effects */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-fuchsia-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-fuchsia-500 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      <style jsx>{`
        .group:hover .left-image {
          transform: translateX(-10px);
        }
        .group:hover .right-image {
          transform: translateX(10px);
        }
      `}</style>
    </div>
  );
}