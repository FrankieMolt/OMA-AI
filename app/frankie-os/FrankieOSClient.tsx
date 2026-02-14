'use client';
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Calendar,
  Search,
  Layout,
  Plus,
  X,
  ChevronRight,
  Clock,
  Tag,
  FileText,
  Filter,
  MoreHorizontal,
  GripVertical,
  Shield,
  Cpu,
  Layers
} from 'lucide-react';
import { format } from 'date-fns';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  column: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  due_date?: string;
  created_at: string;
  tags?: string;
  assignee?: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'milestone';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  tags?: string;
}

interface Activity {
  id: string;
  type: 'task' | 'event' | 'file' | 'system';
  title: string;
  description?: string;
  created_at: string;
}

interface SearchResult {
  id: string;
  path: string;
  filename: string;
  content?: string;
  file_type: string;
  last_modified: string;
}

export default function FrankieOSDashboard() {
  const [activeTab, setActiveTab] = useState<'activities' | 'calendar' | 'search' | 'kanban'>('activities');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Simulate data loading
      setActivities([
        { id: '1', type: 'system', title: 'Kernel Update v2.4.1', description: 'System core updated successfully.', created_at: new Date().toISOString() },
        { id: '2', type: 'task', title: 'Integrate x402 SDK', description: 'Agent payment layer integration pending.', created_at: new Date().toISOString() }
      ]);
      setTasks([]);
      setEvents([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    // DND Logic
  };

  const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
                 Operating System
              </Badge>
              <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-4 font-display text-memoria-text-hero">
                 Frankie<span className="text-memoria-text-secondary">OS</span>
              </h1>
              <p className="text-memoria-text-whisper text-sm font-light uppercase tracking-widest">Internal Intelligence Management</p>
           </div>
           
           <nav className="flex items-center gap-1 bg-memoria-bg-card border border-memoria-border-muted p-1 rounded-sm">
              {[
                { id: 'activities', icon: Activity, label: 'Feed' },
                { id: 'calendar', icon: Calendar, label: 'Timeline' },
                { id: 'search', icon: Search, label: 'Index' },
                { id: 'kanban', icon: Layout, label: 'Tasks' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark'
                      : 'text-memoria-text-whisper hover:text-white hover:bg-memoria-bg-surface'
                  }`}
                >
                  <tab.icon size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline">{tab.label}</span>
                </button>
              ))}
           </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-memoria-text-meta">
            <Cpu size={48} className="animate-pulse mb-4 opacity-20" />
            <p className="text-[10px] uppercase tracking-[0.3em]">Synchronizing Stream...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                   <span className="label-whisper">Activity Stream</span>
                   <div className="hero-number text-4xl">{activities.length}</div>
                </div>
                
                <div className="space-y-4">
                   {activities.map((activity) => (
                     <Card key={activity.id} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6 hover:border-memoria-border-active transition-all">
                        <div className="flex items-start gap-6">
                           <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center shrink-0">
                              <Layers size={18} className="text-memoria-text-hero" />
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-light text-memoria-text-hero mb-1">{activity.title}</h3>
                              <p className="text-sm text-memoria-text-whisper font-light mb-4">{activity.description}</p>
                              <div className="flex items-center gap-2 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
                                 <Clock size={12} />
                                 <span>{format(new Date(activity.created_at), 'MMM d, yyyy • h:mm a')}</span>
                                 <span className="text-memoria-border-muted">|</span>
                                 <span className="text-memoria-text-hero">{activity.type}</span>
                              </div>
                           </div>
                        </div>
                     </Card>
                   ))}
                </div>
              </motion.div>
            )}

            {/* Other tabs would follow similar refactor logic */}
            {activeTab !== 'activities' && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-memoria-border-muted rounded-sm text-memoria-text-meta">
                 <Shield size={48} className="mb-4 opacity-20" />
                 <p className="text-[10px] uppercase tracking-[0.2em]">Module Migration in Progress</p>
                 <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('activities')}
                    className="mt-6 border-memoria-border-muted text-memoria-text-meta hover:text-white"
                 >
                    Back to Feed
                 </Button>
              </div>
            )}
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
