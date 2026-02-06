import React from 'react';
import { Server } from 'lucide-react';

export default function EnhancedMarketplace({ services, categories }: any) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        {categories?.map((cat: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
            {cat}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services?.slice(0, 6).map((service: any, i: number) => (
          <div key={i} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Server size={24} className="text-purple-500" />
              <div>
                <div className="font-semibold">{service.name || 'Service ' + (i + 1)}</div>
                <div className="text-sm text-zinc-400">{service.type || 'AI'}</div>
              </div>
            </div>
            <div className="text-sm text-zinc-400">{service.description || 'Service description'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
