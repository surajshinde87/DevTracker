'use client';
import CTASection from '@/components/home/CTA';
import Features from '@/components/home/Features';
import HeroSection from '@/components/home/Hero';
import HowitWorks from '@/components/home/Howitworks';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react'

const Home = () => {
  return (
    <div>
     <Navbar/>
      <HeroSection/>
      <Features/>
      <HowitWorks/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Home;
