'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedDeals from '@/components/FeaturedDeals';
import Categories from '@/components/Categories';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <Categories />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
