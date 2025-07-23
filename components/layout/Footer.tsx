'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {Github, Twitter, Linkedin, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(linksRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: 'back.out(1.2)'
      });

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
      className="relative overflow-hidden bg-[#f7f5fa] dark:bg-[#0c0614] transition-colors duration-300"
    >
      {/* Gradient background */}
      <div className="footer-gradient absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-20 dark:opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-12 lg:px-8">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400">
              DevTracker
            </span>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-400 max-w-md">
            The ultimate platform to track, learn and master developer skills.
          </p>
        </div>

        {/* CTA + Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div
            ref={el => {linksRef.current[0] = el}}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-px rounded-lg"
          >
            <Link
              href="/auth/register"
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-opacity-90 transition-all"
            >
              <Zap size={20} />
              Start Tracking For Free
            </Link>
          </div>

          <div
            ref={el => {linksRef.current[1] = el}}
            className="flex items-center gap-6"
          >
            {[
              { icon: <Github size={28} />, href: "https://github.com/surajshinde87" },
              { icon: <Twitter size={28} />, href: "https://x.com/surajshinde_87" },
              { icon: <Linkedin size={28} />, href: "https://www.linkedin.com/in/surajshinde87" }
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-transform transform hover:scale-110"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} DevTracker. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => { particleRefs.current[i] = el; }}
            className="absolute rounded-full bg-gray-300/20 dark:bg-white/5"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>
    </footer>
  );
}


// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import { Github, Twitter, Linkedin } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// export default function Footer() {
//   const footerRef = useRef<HTMLElement>(null);
//   const linksRef = useRef<(HTMLDivElement | null)[]>([]);
//   const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(footerRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: footerRef.current,
//           start: "top bottom-=100",
//           toggleActions: "play none none none",
//         },
//       });

//       gsap.from(linksRef.current, {
//         y: 20,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.1,
//         delay: 0.3,
//         ease: "back.out(1.2)",
//       });

//       particleRefs.current.forEach((particle, i) => {
//         if (!particle) return;
//         gsap.to(particle, {
//           y: Math.random() * 30 - 15,
//           x: Math.random() * 20 - 10,
//           duration: Math.random() * 6 + 4,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: i * 0.2,
//         });
//       });

//       gsap.to(".footer-gradient", {
//         x: 30,
//         y: -20,
//         duration: 25,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     }, footerRef);

//     return () => ctx.revert();
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <footer
//       ref={footerRef}
//       className="relative overflow-hidden bg-[#f7f5fa] dark:bg-[#0c0614] transition-colors duration-300"
//     >
//       <div className="relative max-w-7xl mx-auto px-6 sm:py-12 lg:px-8">
//         {/* Main Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 text-gray-600 dark:text-gray-300">
//           {/* About */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
//               About
//             </h4>
//             <p>
//               DevTracker helps developers stay accountable and track their
//               journey toward becoming better every day.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               {[
//                 { label: "Start Tracking", href: "/auth/register" },
//                 { label: "Privacy Policy", href: "#privacy" },
//                 { label: "Terms of Service", href: "#terms" },
//               ].map((link, i) => (
//                 <li key={i}>
//                   <Link href={link.href} className="hover:text-purple-600">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter & Social */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
//               Subscribe to our newsletter
//             </h4>
//             <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 w-full bg-white dark:bg-gray-800 text-sm outline-none"
//               />
//               <button className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition">
//                 Subscribe
//               </button>
//             </div>
//             <div>
//               <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
//                 Follow Us
//               </h4>
//               <div className="flex gap-5">
//                 {[
//                   {
//                     icon: <Github size={22} />,
//                     href: "https://github.com/surajshinde87",
//                   },
//                   {
//                     icon: <Twitter size={22} />,
//                     href: "https://x.com/surajshinde_87",
//                   },
//                   {
//                     icon: <Linkedin size={22} />,
//                     href: "https://www.linkedin.com/in/surajshinde87",
//                   },
//                 ].map((social, i) => (
//                   <Link
//                     key={i}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-black dark:hover:text-white transform hover:scale-110 transition"
//                   >
//                     {social.icon}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

//         {/* Footer Bottom */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
//           <p>© {new Date().getFullYear()} DevTracker. All rights reserved.</p>
//           <p>Built with 💜 by DevTracker Team</p>
//         </div>
//       </div>

//       {/* Particles */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             ref={el => {particleRefs.current[i] = el}}
//             className="absolute rounded-full bg-gray-300/20 dark:bg-white/5"
//             style={{
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.3 + 0.1,
//             }}
//           />
//         ))}
//       </div>

//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className="fixed bottom-6 right-6 z-10 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition"
//         aria-label="Back to Top"
//       >
//         ↑
//       </button>
//     </footer>
//   );
// }
