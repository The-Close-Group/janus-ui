import React, { useState, useRef } from 'react';
// For drag-and-drop, we'll use react-dnd (setup only, not full logic)
// import { useDrag, useDrop, DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 8pm

// Generate random demo events
function getInitialEvents() {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    // 0-2 events per day
    const numEvents = Math.floor(Math.random() * 3);
    return Array.from({ length: numEvents }, () => {
      const hour = hours[Math.floor(Math.random() * hours.length)];
      return { day: dayIdx, hour, title: 'Scheduled Post' };
    });
  });
}

function formatHour(hour: number) {
  const ampm = hour >= 12 ? 'pm' : 'am';
  const display = hour > 12 ? hour - 12 : hour;
  return `${display}${ampm}`;
}

// Placeholder for drag-and-drop event wrapper
const DraggableEvent = ({ children }: { children: React.ReactNode }) => {
  // const [{ isDragging }, drag] = useDrag({ ... });
  // return <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>{children}</div>;
  return <div>{children}</div>;
};

// Timeline view component
export const TimelineView: React.FC = () => {
  // Flatten all events and sort by day/hour
  const allEvents = getInitialEvents().flat().sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.hour - b.hour;
  });
  // Calculate positions for dots (0=start, 1=end)
  const totalSlots = days.length * hours.length;
  const getPosition = (day: number, hour: number) => ((day * hours.length + (hour - hours[0])) / (totalSlots - 1)) * 100;
  // Campaign dates
  const startDate = 'Saturday, April 26th, 2025';
  const endDate = 'Monday, May 26th, 2025';
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 relative">
      {/* Zoom controls in top right corner */}
      <div className="absolute right-8 top-0 z-20">
        <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs shadow-sm border border-gray-200 cursor-pointer" disabled>
          Zoom (coming soon)
        </button>
      </div>
      {/* Add extra top margin to timeline area to avoid overlap */}
      <div className="relative w-full h-24 flex items-center mt-8" style={{ maxWidth: '100%' }}>
        {/* Timeline line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 rounded-full" style={{ transform: 'translateY(-50%)' }} />
        {/* Start label and date */}
        <div className="absolute left-0 -top-10 text-xs text-gray-700 font-semibold text-left">
          <div>Start of Campaign</div>
          <div className="text-gray-500 font-normal">{startDate}</div>
        </div>
        {/* End label and date */}
        <div className="absolute right-0 -top-10 text-xs text-gray-700 font-semibold text-right">
          <div>End of Campaign</div>
          <div className="text-gray-500 font-normal">{endDate}</div>
        </div>
        {/* Dots for events */}
        {allEvents.map((event, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `calc(${getPosition(event.day, event.hour)}%)` }}
          >
            <div className="w-5 h-5 bg-brand-purple rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <span className="sr-only">{event.title}</span>
            </div>
            <div className="text-xs text-gray-600 mt-2 whitespace-nowrap text-center" style={{ minWidth: 60 }}>
              {days[event.day]}, {formatHour(event.hour)}
            </div>
          </div>
        ))}
        {/* Start and end dots */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-md" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-white shadow-md" />
        </div>
      </div>
    </div>
  );
};

const WeeklyCalendar: React.FC = () => {
  const [events, setEvents] = useState(getInitialEvents());
  const [dragged, setDragged] = useState<{ day: number; hour: number; idx: number } | null>(null);
  const dragOverCell = useRef<{ day: number; hour: number } | null>(null);

  // Helper to move an event
  const moveEvent = (fromDay: number, fromHour: number, idx: number, toDay: number, toHour: number) => {
    setEvents((prev) => {
      const newEvents = prev.map((dayEvents, dIdx) =>
        dIdx === fromDay ? dayEvents.filter((e, i) => !(e.hour === fromHour && i === idx)) : [...dayEvents]
      );
      newEvents[toDay] = [
        ...newEvents[toDay],
        { day: toDay, hour: toHour, title: 'Scheduled Post' },
      ];
      return newEvents;
    });
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="relative rounded-2xl border border-gray-200 shadow-md bg-gray-50 w-full">
        {/* Time labels overlay */}
        <div className="absolute left-0 top-[44px] bottom-0 z-10 flex flex-col w-12">
          {hours.map((hour) => (
            <div key={hour} className="h-12 flex items-start justify-end pr-2 text-xs text-gray-400 select-none sticky top-[44px] bg-gray-50 z-20">
              {formatHour(hour)}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="pl-12">
          <div className="grid grid-cols-7 w-full sticky top-0 z-30 bg-gray-50">
            {days.map((day, idx) => (
              <div
                key={day}
                className={`text-center py-2 font-semibold text-gray-700 border-b border-gray-200 ${idx !== 0 ? 'border-l border-gray-100' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 w-full">
            {days.map((_, dayIdx) => (
              <div
                key={dayIdx}
                className={`flex flex-col h-full ${dayIdx !== 0 ? 'border-l border-gray-100' : ''}`}
              >
                {hours.map((hour) => {
                  // Find event at this slot
                  const eventIdx = events[dayIdx].findIndex((e) => e.hour === hour);
                  const event = eventIdx !== -1 ? events[dayIdx][eventIdx] : null;
                  return (
                    <div
                      key={hour}
                      className={`h-12 border-b border-gray-200 relative group ${dragOverCell.current && dragOverCell.current.day === dayIdx && dragOverCell.current.hour === hour ? 'bg-brand-purple/10' : ''}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        dragOverCell.current = { day: dayIdx, hour };
                      }}
                      onDrop={() => {
                        if (dragged) {
                          moveEvent(dragged.day, dragged.hour, dragged.idx, dayIdx, hour);
                          setDragged(null);
                        }
                        dragOverCell.current = null;
                      }}
                      onDragLeave={() => {
                        dragOverCell.current = null;
                      }}
                    >
                      {event && (
                        <div
                          draggable
                          onDragStart={() => setDragged({ day: dayIdx, hour, idx: eventIdx })}
                          onDragEnd={() => setDragged(null)}
                          className="absolute left-1 right-1 top-1 bottom-1 bg-brand-purple/80 text-white text-xs rounded-lg flex items-center justify-center shadow-md cursor-move z-10"
                          style={{ opacity: dragged && dragged.day === dayIdx && dragged.hour === hour ? 0.5 : 1 }}
                        >
                          {event.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar; 