'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Settings } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  decayRate: number;
}

export default function MemoryDecayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [decaySpeed, setDecaySpeed] = useState(1);
  const [generation, setGeneration] = useState(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const generationStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles (memories)
    const initParticles = () => {
      const particles: Particle[] = [];
      const count = 50;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * (canvas.width / 2),
          y: Math.random() * (canvas.height / 2),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 4 + 2,
          opacity: 1,
          decayRate: 0.0005 + Math.random() * 0.001
        });
      }
      particlesRef.current = particles;
    };
    initParticles();

    // Draw function
    const draw = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / 100) * p1.opacity * p2.opacity * 0.5;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        if (p.opacity <= 0.01) return;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    // Update function
    const update = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      
      particlesRef.current.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Decay
        p.opacity -= p.decayRate * decaySpeed;
        
        // Regenerate if fully decayed
        if (p.opacity <= 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.opacity = 1;
          p.size = Math.random() * 4 + 2;
        }
      });

      // Check generation progress
      const elapsed = Date.now() - generationStartTime.current;
      const progress = Math.min(1, elapsed / 10000); // 10 seconds per generation
      
      if (progress >= 1) {
        generationStartTime.current = Date.now();
        setGeneration(g => (g + 1) % 8);
      }
    };

    // Animation loop
    const animate = () => {
      if (isPlaying) {
        update();
        draw();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, decaySpeed]);

  const handleReset = () => {
    generationStartTime.current = Date.now();
    setGeneration(0);
    particlesRef.current.forEach((p) => {
      p.opacity = 1;
    });
  };

  const generationLabels = [
    'Present (100%)',
    '1 Generation (~30 years)',
    '2 Generations (~60 years)',
    '3 Generations (~90 years)',
    '4 Generations (~120 years)',
    '5 Generations (~150 years)',
    '6 Generations (~180 years)',
    '7 Generations (~210 years)'
  ];

  const preservationRates = ['100%', '~30%', '~9%', '~2.7%', '~0.81%', '~0.24%', '~0.07%', '~0.02%'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Memory Decay Visualization</h3>
          <p className="text-sm text-slate-400">How memories fade across generations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800"
        >
          <label className="block text-sm text-slate-400 mb-2">
            Decay Speed: {decaySpeed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={decaySpeed}
            onChange={(e) => setDecaySpeed(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </motion.div>
      )}

      <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
        
        {/* Overlay Info */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm rounded-lg p-3 border border-slate-800">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Generation</div>
          <div className="text-sm text-emerald-400 font-medium">{generationLabels[generation]}</div>
          <div className="text-xs text-slate-600 mt-2">Memory Preserved: {preservationRates[generation]}</div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-sm rounded-lg p-3 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400">Active Memory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-emerald-500/50"></div>
            <span className="text-slate-400">Connection</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((gen) => (
          <button
            key={gen}
            onClick={() => {
              setGeneration(gen);
              generationStartTime.current = Date.now() - gen * 1250;
            }}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              generation === gen
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-950 text-slate-500 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Gen {gen}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
