import { useEffect, useState } from 'react';

// Години роботи — онови під реального клієнта
const HOURS: Record<number, [number, number] | null> = {
  0: [9, 20], // неділя
  1: [8, 20],
  2: [8, 20],
  3: [8, 20],
  4: [8, 20],
  5: [8, 20],
  6: [9, 20] // субота
};

function getStatus(now: Date) {
  const day = now.getDay();
  const range = HOURS[day];
  if (!range) return { open: false, label: 'Зачинено сьогодні' };

  const [openHour, closeHour] = range;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = minutes >= openHour * 60 && minutes < closeHour * 60;

  if (isOpen) {
    const closesIn = closeHour * 60 - minutes;
    const label = closesIn <= 60 ? `Зачиняємось через ${closesIn} хв` : `До ${String(closeHour).padStart(2, '0')}:00`;
    return { open: true, label };
  }

  return { open: false, label: `Відкриємось о ${String(openHour).padStart(2, '0')}:00` };
}

export default function StatusBadge() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Перший рендер на сервері — нейтральний стан, щоб уникнути hydration-мерехтіння
  if (!status) {
    return (
      <span className="pill">
        <span className="h-2 w-2 rounded-full bg-cream/30 mr-2" />
        Перевіряємо графік…
      </span>
    );
  }

  return (
    <span className={'pill ' + (status.open ? 'border-lime/40' : 'border-cream/20')}>
      <span
        className={
          'h-2 w-2 rounded-full mr-2 ' + (status.open ? 'bg-lime shadow-glow' : 'bg-cream/30')
        }
      />
      {status.open ? 'Відкриті зараз' : 'Зачинені'} · {status.label}
    </span>
  );
}
