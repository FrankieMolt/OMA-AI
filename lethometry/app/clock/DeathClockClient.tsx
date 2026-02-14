'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DeathClockClient() {
  const [age, setAge] = useState<number>(25);
  const [expectancy, setExpectancy] = useState<number>(85);
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (isCalculated) {
      const timer = setInterval(calculateTime, 1000);
      return () => clearInterval(timer);
    }
  }, [isCalculated, age, expectancy]);

  const calculateTime = () => {
    const yearsRemaining = Math.max(0, expectancy - age);
    const days = Math.floor(yearsRemaining * 365.25);
    const hours = Math.floor((yearsRemaining * 365.25 % 1) * 24);
    const minutes = Math.floor(((yearsRemaining * 365.25 % 1) * 24 % 1) * 60);
    const seconds = Math.floor((((yearsRemaining * 365.25 % 1) * 24 % 1) * 60 % 1) * 60);
    setTimeLeft({ days, hours, minutes, seconds });
  };

  const handleCalculate = () => {
    setIsCalculated(true);
    calculateTime();
  };

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Temporal Analytics
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             The Death<br/><span className="italic text-memoria-text-secondary">Clock</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-12">
             Calculate your remaining temporal assets based on actuarial data and lifestyle factors. 
             Every second counts in the quantification of existence.
          </p>
          
          {!isCalculated ? (
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 max-w-xl">
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-memoria-text-meta block mb-3">Current Age</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm px-4 py-3 text-2xl font-light text-memoria-text-hero focus:outline-none focus:border-memoria-border-active"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-memoria-text-meta block mb-3">Life Expectancy</label>
                  <input 
                    type="number" 
                    value={expectancy}
                    onChange={(e) => setExpectancy(Number(e.target.value))}
                    className="w-full bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm px-4 py-3 text-2xl font-light text-memoria-text-hero focus:outline-none focus:border-memoria-border-active"
                  />
                </div>
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-14 text-xs font-bold uppercase tracking-widest"
                >
                  Begin Calculation
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 text-center">
                <span className="label-whisper block mb-4">Days</span>
                <div className="hero-number text-6xl">{timeLeft.days.toLocaleString()}</div>
              </Card>
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 text-center">
                <span className="label-whisper block mb-4">Hours</span>
                <div className="hero-number text-6xl">{timeLeft.hours}</div>
              </Card>
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 text-center">
                <span className="label-whisper block mb-4">Minutes</span>
                <div className="hero-number text-6xl">{timeLeft.minutes}</div>
              </Card>
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 text-center">
                <span className="label-whisper block mb-4">Seconds</span>
                <div className="hero-number text-6xl">{timeLeft.seconds}</div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
