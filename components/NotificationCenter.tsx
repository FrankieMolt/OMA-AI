import React from 'react';

export default function NotificationCenter({ notifications, onMarkRead, onDismiss }: any) {
  return (
    <div className="relative">
      <button className="relative p-2 rounded-md hover:bg-zinc-800 transition-colors">
        <div className="w-6 h-6" />
      </button>
      {notifications.length > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
          {notifications.length}
        </span>
      )}
    </div>
  );
}
