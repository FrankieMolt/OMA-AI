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
  GripVertical
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

// Kanban Column Component
function KanbanColumn({
  title,
  tasks,
  columnId,
  onTaskClick,
  onAddTask
}: {
  title: string;
  tasks: Task[];
  columnId: string;
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
}) {
  return (
    <div className="flex-shrink-0 w-80 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-zinc-100">{title}</h3>
        <span className="text-sm text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
        <button
          onClick={onAddTask}
          className="w-full p-3 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const priorityColors = {
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    urgent: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 hover:border-purple-500/50 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-zinc-100 line-clamp-2">{task.title}</h4>
        <GripVertical size={14} className="text-zinc-600 cursor-grab" />
      </div>
      {task.description && (
        <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.due_date && (
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Clock size={12} />
              {format(new Date(task.due_date), 'MMM d')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Main Dashboard Component
export default function FrankieOSDashboard() {
  const [activeTab, setActiveTab] = useState<'activities' | 'calendar' | 'search' | 'kanban'>('activities');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'task' | 'event'>('task');
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const response = await fetch(`/api/frankie/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          setSearchResults(data.results || []);
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksRes, eventsRes, activitiesRes] = await Promise.all([
        fetch('/api/frankie/tasks'),
        fetch('/api/frankie/events'),
        fetch('/api/frankie/activities?limit=50')
      ]);

      const tasksData = await tasksRes.json();
      const eventsData = await eventsRes.json();
      const activitiesData = await activitiesRes.json();

      setTasks(tasksData.tasks || []);
      setEvents(eventsData.events || []);
      setActivities(activitiesData.activities || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Handle task movement between columns
      const taskId = active.id.toString();
      const targetColumn = over.id.toString();

      try {
        await fetch('/api/frankie/tasks', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: taskId, column: targetColumn })
        });
        loadData();
      } catch (error) {
        console.error('Error moving task:', error);
      }
    }
  };

  const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Layout size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Frankie OS</h1>
                <p className="text-xs text-zinc-500">Internal Dashboard</p>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'activities'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Activity size={18} />
                <span className="hidden sm:inline">Activity</span>
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'calendar'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Calendar size={18} />
                <span className="hidden sm:inline">Calendar</span>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'search'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Search size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>
              <button
                onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'kanban'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Layout size={18} />
                <span className="hidden sm:inline">Kanban</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-500">Loading...</div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ActivityFeed activities={activities} />
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CalendarView events={events} selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </motion.div>
            )}

            {activeTab === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlobalSearch
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  results={searchResults}
                  onIndex={async () => {
                    await fetch('/api/frankie/search', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'index' })
                    });
                    alert('Indexing complete');
                  }}
                />
              </motion.div>
            )}

            {activeTab === 'kanban' && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <KanbanBoard tasks={tasks} columns={columns} sensors={sensors} onDragEnd={handleDragEnd} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

// Activity Feed Component
function ActivityFeed({ activities }: { activities: Activity[] }) {
  const typeIcons = {
    task: <Layout size={16} className="text-blue-400" />,
    event: <Calendar size={16} className="text-green-400" />,
    file: <FileText size={16} className="text-yellow-400" />,
    system: <Activity size={16} className="text-purple-400" />
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Feed</h2>
        <span className="text-zinc-500 text-sm">{activities.length} activities</span>
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                {typeIcons[activity.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-zinc-100 font-medium">{activity.title}</p>
                {activity.description && (
                  <p className="text-sm text-zinc-400 mt-1">{activity.description}</p>
                )}
                <p className="text-xs text-zinc-500 mt-2">
                  {format(new Date(activity.created_at), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No activities yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Calendar View Component
function CalendarView({
  events,
  selectedDate,
  onDateChange
}: {
  events: Event[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}) {
  const currentMonth = format(selectedDate, 'MMMM yyyy');
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, () => null);

  const typeColors = {
    meeting: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    deadline: 'bg-red-500/20 text-red-400 border-red-500/30',
    reminder: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    milestone: 'bg-green-500/20 text-green-400 border-green-500/30'
  };

  const getEventsForDay = (day: number) => {
    const dateStr = format(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day),
      'yyyy-MM-dd'
    );
    return events.filter((e) => e.start_date.startsWith(dateStr));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <span className="text-lg font-medium min-w-32 text-center">{currentMonth}</span>
          <button
            onClick={() => onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-zinc-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {padding.map((_, i) => (
            <div key={`padding-${i}`} />
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday =
              format(new Date(), 'yyyy-MM-dd') ===
              format(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day), 'yyyy-MM-dd');

            return (
              <div
                key={day}
                className={`min-h-24 p-2 rounded-lg border transition-all ${
                  isToday
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${isToday ? 'text-purple-400 font-bold' : 'text-zinc-400'}`}>
                    {day}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded truncate border ${typeColors[event.type]}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-zinc-500 px-2">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Global Search Component
function GlobalSearch({
  query,
  onQueryChange,
  results,
  onIndex
}: {
  query: string;
  onQueryChange: (q: string) => void;
  results: SearchResult[];
  onIndex: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Global Search</h2>
        <button
          onClick={onIndex}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
        >
          <Filter size={16} />
          Reindex Files
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        <input
          type="text"
          placeholder="Search files, tasks, events..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        {query.length < 2 ? (
          <div className="text-center py-12 text-zinc-500">
            Type at least 2 characters to search
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No results found
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-start gap-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-zinc-100 font-medium truncate">{result.filename}</h3>
                  <p className="text-sm text-zinc-500 truncate">{result.path}</p>
                  {result.content && (
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {result.content.substring(0, 150)}...
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {result.file_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {format(new Date(result.last_modified), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Kanban Board Component
function KanbanBoard({
  tasks,
  columns,
  sensors,
  onDragEnd
}: {
  tasks: Task[];
  columns: Array<{ id: string; title: string }>;
  sensors: any;
  onDragEnd: (event: DragEndEvent) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <span className="text-zinc-500 text-sm">{tasks.length} tasks</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tasks={tasks.filter((t) => t.column === column.id)}
              columnId={column.id}
              onTaskClick={(task) => console.log('Task clicked:', task)}
              onAddTask={() => console.log('Add task to:', column.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
