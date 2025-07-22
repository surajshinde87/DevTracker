'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#');
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Animation on mount
  useEffect(() => {
    // Initial animations
    gsap.from(logoRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    gsap.from(navLinksRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    });

    gsap.from(buttonRef.current, {
      opacity: 0,
      y: -10,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [mobileMenuOpen]);

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (targetId === '#') {
      // Scroll to top
      gsap.to(window, {
        duration: 1,
        scrollTo: 0,
        ease: 'power2.inOut'
      });
      window.history.pushState(null, '', '/');
      setActiveLink('#');
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      // Calculate position with offset for navbar
      const yOffset = -80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + yOffset;

      // Animate scroll
      gsap.to(window, {
        duration: 1,
        scrollTo: offsetPosition,
        ease: 'power2.inOut'
      });

      // Update URL
      window.history.pushState(null, '', targetId);
      setActiveLink(targetId);
    }
  };

  // Add scroll listener to highlight active section
  useEffect(() => {
    const handleScrollHighlight = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = [
        { id: '#hero', element: document.querySelector('#hero') },
        { id: '#features', element: document.querySelector('#features') },
        { id: '#how-it-works', element: document.querySelector('#how-it-works') },
        { id: '#why-devtracker', element: document.querySelector('#why-devtracker') }
      ];

      // Check if we're at the very top of the page
      if (window.scrollY < 50) {
        setActiveLink('#');
        return;
      }

      // Check each section
      let foundActive = false;
      sections.forEach(({ id, element }) => {
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          const sectionTop = offsetTop;
          const sectionBottom = offsetTop + offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveLink(id);
            foundActive = true;
          }
        }
      });

      // If no section is active (scrolled past all sections)
      if (!foundActive && scrollPosition > (document.body.scrollHeight - window.innerHeight - 100)) {
        setActiveLink('#why-devtracker');
      }
    };

    window.addEventListener('scroll', handleScrollHighlight);
    // Initial check in case page loads with hash
    handleScrollHighlight();

    return () => window.removeEventListener('scroll', handleScrollHighlight);
  }, []);

  const navItems = [
    { path: '#', label: 'Home' },
    { path: '#features', label: 'Features' },
    { path: '#how-it-works', label: 'How it Works' },
    { path: '#why-devtracker', label: 'Why DevTracker' },
  ];

  return (
    <>
      <header className="h-24 flex justify-between items-center p-4 px-4 md:px-10 bg-gray-900/95 backdrop-blur-sm text-white font-extrabold shadow-md z-50 sticky top-0">
        <Link href="/" passHref>
          <h2
            className="text-2xl md:text-3xl tracking-wider text-white cursor-pointer"
            ref={logoRef}
            onClick={(e) => {
              e.preventDefault();
              handleScroll(e, '#');
            }}
          >
            Dev<span className="text-fuchsia-400">Tracker</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-sm">
            {navItems.map((item, index) => (
              <li key={index} ref={el => { navLinksRef.current[index] = el; }}>
                <Link 
                  href={item.path}
                  onClick={(e) => handleScroll(e, item.path)}
                  className={`hover:text-fuchsia-400 transition-colors ${activeLink === item.path ? 'text-fuchsia-400' : 'text-white'}`}
                  scroll={false}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex gap-3" ref={buttonRef}>
          <Link href="/auth/login" passHref>
            <button className="bg-fuchsia-400 text-gray-900 px-4 py-1 rounded hover:bg-fuchsia-500 transition-all hover:shadow-lg hover:shadow-fuchsia-400/20">
              Login
            </button>
          </Link>
          <Link href="/auth/register" passHref>
            <button className="border border-fuchsia-400 text-fuchsia-300 px-4 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition-all hover:shadow-lg hover:shadow-fuchsia-400/20">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 w-64 bg-gray-900/95 backdrop-blur-sm z-40 transform translate-x-full md:hidden"
        style={{ top: '64px' }}
      >
        <div className="flex flex-col p-6 space-y-6">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className={`text-lg ${activeLink === item.path ? 'text-fuchsia-400' : 'text-white'} hover:text-fuchsia-400 transition-colors`}
              scroll={false}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-700">
            <Link href="/auth/login" passHref>
              <button className="w-full bg-fuchsia-400 text-gray-900 px-4 py-2 rounded hover:bg-fuchsia-500 transition">
                Login
              </button>
            </Link>
            <Link href="/auth/register" passHref>
              <button className="w-full border border-fuchsia-400 text-fuchsia-300 px-4 py-2 rounded hover:bg-fuchsia-600 hover:text-white transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;