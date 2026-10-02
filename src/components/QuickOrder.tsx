import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cart, cartTotal, closeCart, isCartOpen, removeFromCart, setQty, clearCart } from '../stores/cart';

const OPEN_HOUR = 8;
const CLOSE_HOUR = 20;
const MIN_LEAD_MINUTES = 20;

function fmt(price: number) {
  return `${price} грн`;
}

function nextValidTime(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + MIN_LEAD_MINUTES);
  if (now.getHours() < OPEN_HOUR) {
    now.setHours(OPEN_HOUR, 0, 0, 0);
  }
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export default function QuickOrder() {
  const open = useStore(isCartOpen);
  const lines = useStore(cart);
  const total = cartTotal(lines);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState(nextValidTime());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const minTime = useMemo(nextValidTime, [open]);

  // Блокуємо скрол сторінки позаду, поки відкрито кошик
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  function validate() {
    const next: Record<string, string> = {};
    if (lines.length === 0) next.cart = 'Кошик порожній — додай щось із меню';
    if (name.trim().length < 2) next.name = 'Вкажи ім\u2019я (мінімум 2 символи)';
    if (!/^\+?\d{9,13}$/.test(phone.replace(/[\s()-]/g, ''))) next.phone = 'Перевір номер телефону';

    const [h, m] = pickupTime.split(':').map(Number);
    const minutes = h * 60 + m;
    if (minutes < OPEN_HOUR * 60 || minutes >= CLOSE_HOUR * 60) {
      next.time = `Оберіть час з ${OPEN_HOUR}:00 до ${CLOSE_HOUR}:00`;
    } else {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      if (minutes < nowMinutes + MIN_LEAD_MINUTES) {
        next.time = `Мінімум ${MIN_LEAD_MINUTES} хв на приготування`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit() {
    if (!validate()) return;
    setConfirmed(true);
    clearCart();
  }

  function close() {
    closeCart();
    if (confirmed) {
      setConfirmed(false);
      setName('');
      setPhone('');
      setErrors({});
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end">
      <div className="absolute inset-0 bg-black/60 animate-fade" onClick={close} />
      <div className="relative w-full sm:w-[440px] max-h-[90dvh] sm:h-full sm:max-h-none bg-slate-soft border-t sm:border-t-0 sm:border-l border-slate-border rounded-t-3xl sm:rounded-none p-6 sm:p-8 animate-sheet sm:animate-drawer overflow-y-auto overscroll-contain">
        <div className="sticky -top-6 sm:-top-8 -mx-6 sm:-mx-8 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 bg-slate-soft z-10 flex items-start justify-between mb-2">
          <div>
            <p className="section-label mb-1">Самовивіз</p>
            <h3 className="text-2xl font-semibold text-cream">Твоє замовлення</h3>
          </div>
          <button onClick={close} className="pill h-9 w-9 !px-0 justify-center" aria-label="Закрити">
            ✕
          </button>
        </div>

        {confirmed ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-lime/15 border border-lime/40 grid place-items-center text-lime text-2xl">
              ✓
            </div>
            <p className="text-lg text-cream font-medium">Замовлення прийнято</p>
            <p className="text-sm text-cream/50 mt-2">Чекаємо на {pickupTime} — {name}, підтвердимо на {phone}</p>
            <button onClick={close} className="mt-8 rounded-full border border-slate-border px-6 py-2.5 text-sm text-cream/80 hover:border-cream/40">
              Закрити
            </button>
          </div>
        ) : (
          <>
            {lines.length === 0 ? (
              <p className="text-cream/50 py-10 text-center">
                Кошик порожній. Обери щось у{' '}
                <a href="#menu" onClick={close} className="text-lime underline underline-offset-4">
                  меню
                </a>
                .
              </p>
            ) : (
              <ul className="space-y-4 mb-6">
                {lines.map((line) => (
                  <li key={line.id} className="flex items-start justify-between gap-3 border-b border-slate-border pb-4">
                    <div>
                      <p className="text-cream text-[15px]">{line.name}</p>
                      <p className="text-xs text-cream/40 mt-0.5">
                        {[line.size !== '—' && line.size, line.milk !== '—' && line.milk, line.extraShot && '+ шот', line.syrup !== '—' && line.syrup]
                          .filter(Boolean)
                          .join(' · ') || 'Стандарт'}
                      </p>
                      <div className="flex items-center gap-2 mt-2 pill !px-2 w-fit">
                        <button onClick={() => setQty(line.id, line.qty - 1)} className="h-6 w-6 grid place-items-center">−</button>
                        <span className="w-4 text-center text-sm">{line.qty}</span>
                        <button onClick={() => setQty(line.id, line.qty + 1)} className="h-6 w-6 grid place-items-center">+</button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lime font-semibold">{fmt(line.unitPrice * line.qty)}</p>
                      <button onClick={() => removeFromCart(line.id)} className="text-xs text-cream/30 hover:text-cream/60 mt-2">
                        Прибрати
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {lines.length > 0 && (
              <>
                <div className="flex items-center justify-between py-4 border-t border-slate-border mb-6">
                  <span className="text-cream/60">Разом</span>
                  <span className="text-xl font-semibold text-cream">{fmt(total)}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-cream/50 mb-1.5 block">Ім\u2019я</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Андрій"
                      className="w-full rounded-xl border border-slate-border bg-slate px-4 py-2.5 text-sm text-cream outline-none focus:border-lime/50"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-cream/50 mb-1.5 block">Телефон</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 44 123 45 67"
                      className="w-full rounded-xl border border-slate-border bg-slate px-4 py-2.5 text-sm text-cream outline-none focus:border-lime/50"
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-cream/50 mb-1.5 block">
                      Час самовивозу ({OPEN_HOUR}:00–{CLOSE_HOUR}:00, мін. {MIN_LEAD_MINUTES} хв)
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      min={minTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-border bg-slate px-4 py-2.5 text-sm text-cream outline-none focus:border-lime/50"
                    />
                    {errors.time && <p className="text-xs text-red-400 mt-1">{errors.time}</p>}
                  </div>
                </div>

                <button
                  onClick={submit}
                  className="mt-8 w-full rounded-full bg-lime text-slate font-semibold py-3.5 hover:shadow-glow transition-shadow"
                >
                  Підтвердити замовлення · {fmt(total)}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}