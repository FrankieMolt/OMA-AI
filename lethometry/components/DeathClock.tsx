'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, ArrowRight, RefreshCw, Clock } from 'lucide-react';
import { UserData } from '@/types';
import { calculateTimeRemaining, getMotivationalQuote } from '@/lib/calculations';
import { countriesList } from '@/lib/lifeExpectancy';

interface DeathClockProps {
  userData: UserData | null;
  onUpdateUserData: (data: UserData) => void;
}

export default function DeathClock({ userData, onUpdateUserData }: DeathClockProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    birthDate: '',
    country: 'US',
    gender: 'other'
  });
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(formData));
  const [showForm, setShowForm] = useState(!userData);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setTimeRemaining(calculateTimeRemaining(userData));
      setShowForm(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!showForm && userData) {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(userData));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showForm, userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserData(formData);
    setShowForm(false);
  };

  const quote = getMotivationalQuote(timeRemaining.lifeCompletePercent);

  if (showForm) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Calculate Your Time</h2>
          <p className="text-slate-400">Enter your details to see your personalized life clock</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              <User size={16} className="inline mr-2" />
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Birth Date
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {countriesList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserData['gender'] })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Calculate My Time
            <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Time Remaining</h2>
          <p className="text-slate-400">Based on average life expectancy for your demographic</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Life Complete</span>
          <span>{timeRemaining.lifeCompletePercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${timeRemaining.lifeCompletePercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
          />
        </div>
      </div>

      {/* Time Display */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {[
          { value: timeRemaining.years, label: 'Years' },
          { value: timeRemaining.months, label: 'Months' },
          { value: timeRemaining.days, label: 'Days' },
          { value: timeRemaining.hours, label: 'Hours' },
          { value: timeRemaining.minutes, label: 'Minutes' },
          { value: timeRemaining.seconds, label: 'Seconds' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="text-center p-4 bg-slate-950 rounded-xl border border-slate-800"
          >
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
        <p className="text-emerald-400/80 text-sm italic text-center">"{quote}"</p>
      </div>
    </motion.div>
  );
}
