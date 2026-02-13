'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DeathClockPage() {
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
    
    // In a real app, this would use a fixed end date. 
    // Here we just simulate the ticking.
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
             A scientific visualization of your remaining temporal capital. 
             Quantify the finite nature of your existence to optimize current output.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             {/* Controls */}
             <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8">
                <div className="space-y-8">
                   <div>
                      <label htmlFor="age-input" className="text-xs uppercase tracking-widest text-memoria-text-meta mb-4 block">Current Biological Age</label>
                      <input 
                        id="age-input"
                        type="range" 
                        min="1" 
                        max="100" 
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        className="w-full accent-white cursor-pointer"
                        aria-label="Set current age"
                      />
                      <div className="flex justify-between mt-2">
                         <span className="text-2xl font-light font-display">{age}</span>
                         <span className="text-[10px] uppercase text-memoria-text-meta mt-2">Years</span>
                      </div>
                   </div>

                   <div>
                      <label htmlFor="expectancy-input" className="text-xs uppercase tracking-widest text-memoria-text-meta mb-4 block">Projected Life Expectancy</label>
                      <input 
                        id="expectancy-input"
                        type="range" 
                        min={age} 
                        max="120" 
                        value={expectancy}
                        onChange={(e) => setExpectancy(parseInt(e.target.value))}
                        className="w-full accent-white cursor-pointer"
                        aria-label="Set life expectancy"
                      />
                      <div className="flex justify-between mt-2">
                         <span className="text-2xl font-light font-display">{expectancy}</span>
                         <span className="text-[10px] uppercase text-memoria-text-meta mt-2">Years</span>
                      </div>
                   </div>

                   <Button 
                    onClick={handleCalculate}
                    className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-14 text-sm font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-colors"
                   >
                      Initialize Countdown
                   </Button>
                </div>
             </Card>

             {/* Visualization */}
             <div className="relative">
                {isCalculated ? (
                   <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                   >
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-memoria-bg-card border border-memoria-border-muted p-6 rounded-sm text-center">
                            <span className="text-xs uppercase tracking-widest text-memoria-text-meta mb-2 block">Days Remaining</span>
                            <div className="hero-number text-5xl">{timeLeft.days.toLocaleString()}</div>
                         </div>
                         <div className="bg-memoria-bg-card border border-memoria-border-muted p-6 rounded-sm text-center">
                            <span className="text-xs uppercase tracking-widest text-memoria-text-meta mb-2 block">Percent Elapsed</span>
                            <div className="hero-number text-5xl">{Math.round((age / expectancy) * 100)}%</div>
                         </div>
                      </div>

                      <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 text-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
                         <span className="text-xs uppercase tracking-widest text-red-500 mb-4 block">Active Terminal Countdown</span>
                         <div className="flex justify-center items-baseline gap-4">
                            <div className="text-6xl md:text-8xl font-light font-display">{timeLeft.hours.toString().padStart(2, '0')}</div>
                            <div className="text-3xl text-memoria-text-meta">:</div>
                            <div className="text-6xl md:text-8xl font-light font-display">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                            <div className="text-3xl text-memoria-text-meta">:</div>
                            <div className="text-6xl md:text-8xl font-light font-display text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                         </div>
                         <div className="grid grid-cols-3 mt-4 text-[9px] uppercase tracking-[0.3em] text-memoria-text-meta">
                            <span>Hours</span>
                            <span>Minutes</span>
                            <span>Seconds</span>
                         </div>
                      </Card>

                      <div className="flex items-center gap-3 text-memoria-text-meta text-[10px] uppercase tracking-widest justify-center">
                         <Activity size={12} className="text-green-500" />
                         <span>Biological stream synchronized</span>
                      </div>
                   </motion.div>
                ) : (
                   <div className="h-64 border border-dashed border-memoria-border-muted rounded-sm flex flex-col items-center justify-center text-memoria-text-meta bg-memoria-bg-surface/50">
                      <Clock size={48} className="mb-4 opacity-20" />
                      <p className="uppercase tracking-[0.2em] text-xs">Awaiting Input Parameters</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Grid Visualization */}
      {isCalculated && (
        <section className="py-20 px-4 md:px-14 border-t border-memoria-border-muted">
           <div className="mx-auto max-w-7xl">
              <span className="text-xs uppercase tracking-widest text-memoria-text-meta mb-8 block">Existence Grid (Weeks)</span>
              <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1 md:gap-1.5">
                 {Array.from({ length: expectancy * 52 }).map((_, i) => {
                    const elapsed = i < (age * 52);
                    return (
                       <div 
                        key={i} 
                        className={`aspect-square rounded-[1px] ${elapsed ? 'bg-memoria-border-muted' : 'bg-memoria-text-hero/20'}`} 
                        role="presentation"
                        aria-hidden="true"
                       />
                    );
                 })}
              </div>
              <div className="mt-8 flex justify-between text-[10px] uppercase tracking-widest text-memoria-text-meta">
                 <span>Birth</span>
                 <span>Projected Terminal State</span>
              </div>
           </div>
        </section>
      )}
    </div>
  );
}
