'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { CalendarGrid } from '@/components/features/scheduling/calendar-grid';
import { EventForm } from '@/components/features/scheduling/event-form';
import { Modal } from '@/components/ui/modal';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableSkeleton,
} from '@/components/ui/table';
import { schedulingService } from '@/lib/api/services/scheduling.service';
import { useToastStore } from '@/stores/toast.store';
import type { CalendarEventType } from '@/types/scheduling.types';

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const tabs = ['Calendário', 'Escalas de Trabalho'] as const;

type EventFormData = {
  title: string;
  description?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  category: 'meeting' | 'training' | 'campaign' | 'holiday' | 'other';
  location?: string;
};

export default function SchedulingPage() {
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [workSchedules, setWorkSchedules] = useState<
    Awaited<ReturnType<typeof schedulingService.listWorkSchedules>>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Calendário');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState<string | undefined>(undefined);
  const toast = useToastStore();

  async function load() {
    setIsLoading(true);
    try {
      const [evts, schedules] = await Promise.all([
        schedulingService.listEvents(),
        schedulingService.listWorkSchedules(),
      ]);
      setEvents(evts);
      setWorkSchedules(schedules);
    } catch {
      toast.error('Erro ao carregar dados da agenda');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDayClick(date: Date) {
    setDefaultDate(date.toISOString().split('T')[0]);
    setIsModalOpen(true);
  }

  async function handleSubmit(values: EventFormData) {
    setIsSubmitting(true);
    try {
      await schedulingService.createEvent(values);
      toast.success('Evento criado com sucesso');
      setIsModalOpen(false);
      setDefaultDate(undefined);
      load();
    } catch {
      toast.error('Erro ao criar evento');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Agenda"
        action={{ label: 'Novo Evento', onClick: () => setIsModalOpen(true) }}
      />

      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Calendário' && (
        <CalendarGrid
          events={events}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onEventClick={() => {}}
          onDayClick={handleDayClick}
        />
      )}

      {activeTab === 'Escalas de Trabalho' &&
        (isLoading ? (
          <TableSkeleton rows={5} cols={4} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional ID</TableHead>
                <TableHead>Dia da Semana</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workSchedules.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.professionalId}</TableCell>
                  <TableCell>{WEEKDAYS[s.dayOfWeek]}</TableCell>
                  <TableCell>{s.startTime}</TableCell>
                  <TableCell>{s.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDefaultDate(undefined);
        }}
        title="Novo Evento"
      >
        <EventForm
          defaultValues={defaultDate ? { eventDate: defaultDate } : undefined}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}
