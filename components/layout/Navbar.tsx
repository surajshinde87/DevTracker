'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navLinksRef = useRef<Array<HTMLLIElement | null>>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Safe dark mode detection on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  // Animate desktop nav
  useEffect(() => {
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

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.from(mobileMenuRef.current?.children, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.1,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [mobileMenuOpen]);

  // Scroll to section
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === '#') {
      gsap.to(window, {
        duration: 1,
        scrollTo: 0,
        ease: 'power2.inOut',
      });
      window.history.pushState(null, '', '/');
      setActiveLink('#');
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const yOffset = -80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + yOffset;

      gsap.to(window, {
        duration: 1,
        scrollTo: offsetPosition,
        ease: 'power2.inOut',
      });

      window.history.pushState(null, '', targetId);
      setActiveLink(targetId);
    }
  };

  // Highlight nav on scroll
  useEffect(() => {
    const handleScrollHighlight = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = [
        { id: '#hero', element: document.querySelector('#hero') },
        { id: '#features', element: document.querySelector('#features') },
        { id: '#how-it-works', element: document.querySelector('#how-it-works') },
        { id: '#why-devtracker', element: document.querySelector('#why-devtracker') },
      ];

      if (window.scrollY < 50) {
        setActiveLink('#');
        return;
      }

      let foundActive = false;
      sections.forEach(({ id, element }) => {
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveLink(id);
            foundActive = true;
          }
        }
      });

      if (!foundActive && scrollPosition > document.body.scrollHeight - window.innerHeight - 100) {
        setActiveLink('#why-devtracker');
      }
    };

    window.addEventListener('scroll', handleScrollHighlight);
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
      <header
        className={`sticky top-0 z-50 h-18 flex justify-between items-center px-4 md:px-10 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#0c0614] '
            : 'bg-[#f7f5fa] '
        }`}
      >
        <Link href="/" passHref>
          <h2
            ref={logoRef}
            onClick={(e) => handleScroll(e, '#')}
            className={`text-2xl md:text-3xl tracking-wider cursor-pointer font-extrabold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Dev<span className="text-[#6c4bc8]">Tracker</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-lg font-medium">
            {navItems.map((item, index) => (
              <li key={index} ref={(el) => (navLinksRef.current[index] = el)}>
                <Link
                  href={item.path}
                  onClick={(e) => handleScroll(e, item.path)}
                  scroll={false}
                  className={`relative transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                    activeLink === item.path
                      ? 'text-[#6c4bc8] after:scale-x-100'
                      : isDarkMode
                      ? 'text-white hover:text-[#6c4bc8] hover:after:scale-x-100'
                      : 'text-gray-900 hover:text-fuchsia-600 hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3" ref={buttonRef}>
          <Link href="/login">
            <button
              className="bg-[#6c4bc8] text-white px-4 py-2 rounded-lg hover:bg-[#6c4bc8] transition-all shadow-md hover:shadow-[#6c4bc8]0/30"
              type="button"
              aria-label="Login"
            >
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button
              className="border border-[#6c4bc8] text-[#6c4bc8] px-4 py-2 rounded-lg hover:bg-[#6c4bc8] hover:text-white transition-all shadow-md hover:shadow-fuchsia-300/30"
              type="button"
              aria-label="Sign up"
            >
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          type="button"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-24 right-0 w-64 h-[calc(100vh-96px)] z-40 transform translate-x-full md:hidden p-6 transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'bg-[#160b24]' : 'bg-[#f7f5fa]'
        }`}
      >
        <div className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              scroll={false}
              className={`text-lg font-medium transition-colors ${
                activeLink === item.path
                  ? 'text-[#6c4bc8]'
                  : isDarkMode
                  ? 'text-white hover:text-[#6c4bc8]'
                  : 'text-gray-900 hover:text-fuchsia-600'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex flex-col gap-4 pt-6 border-t border-gray-400/40">
            <Link href="/login">
              <button className="w-full bg-[#6c4bc8] text-white px-4 py-2 rounded hover:bg-fuchsia-600 transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full border border-[#6c4bc8] text-[#6c4bc8] px-4 py-2 rounded hover:bg-fuchsia-600 hover:text-white transition">
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
