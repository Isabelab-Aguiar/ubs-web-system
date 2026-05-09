'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarEventType } from '@/types/scheduling.types';

interface CalendarGridProps {
  events: CalendarEventType[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onEventClick: (event: CalendarEventType) => void;
  onDayClick: (date: Date) => void;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const dotColors: Record<string, string> = {
  meeting: 'bg-neutral-400',
  training: 'bg-info-500',
  campaign: 'bg-accent-500',
  holiday: 'bg-warning-500',
  other: 'bg-neutral-400',
};

function getDotColor(category: string) {
  return dotColors[category] ?? 'bg-neutral-400';
}

function buildCalendarDays(month: Date): Date[] {
  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1);
  const lastDay = new Date(year, m + 1, 0);
  const startPad = firstDay.getDay();
  const days: Date[] = [];

  for (let i = startPad - 1; i >= 0; i--) {
    days.push(new Date(year, m, -i));
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, m, d));
  }
  let nextDay = 1;
  while (days.length < 42) {
    days.push(new Date(year, m + 1, nextDay++));
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function CalendarGrid({
  events,
  currentMonth,
  onMonthChange,
  onEventClick,
  onDayClick,
}: CalendarGridProps) {
  const today = new Date();
  const days = buildCalendarDays(currentMonth);

  const rawTitle = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  function prevMonth() {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }

  function nextMonth() {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function getEventsForDay(day: Date) {
    return events.filter((e) => isSameDay(new Date(e.eventDate), day));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
          type="button"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="text-sm font-semibold text-neutral-800">{title}</h3>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
          type="button"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-neutral-400 pb-2">
            {day}
          </div>
        ))}

        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, today);
          const dayEvents = getEventsForDay(day);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick(day)}
              className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors min-h-[52px] ${
                !isCurrentMonth ? 'opacity-30' : ''
              }`}
            >
              <span
                className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday
                    ? 'bg-primary-600 text-white font-bold'
                    : isCurrentMonth
                      ? 'text-neutral-700 font-medium'
                      : 'text-neutral-300'
                }`}
              >
                {day.getDate()}
              </span>

              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 justify-center flex-wrap">
                  {dayEvents.slice(0, 2).map((event) => (
                    <span
                      key={event.id}
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`w-1.5 h-1.5 rounded-full ${getDotColor(event.category)} hidden sm:block cursor-pointer`}
                      title={event.title}
                    />
                  ))}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(dayEvents[0]);
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${getDotColor(dayEvents[0].category)} sm:hidden cursor-pointer`}
                    title={dayEvents[0].title}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
