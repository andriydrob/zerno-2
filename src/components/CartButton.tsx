import { useStore } from '@nanostores/react';
import { cart, cartCount, openCart } from '../stores/cart';

export default function CartButton({ variant = 'nav' }: { variant?: 'nav' | 'fab' }) {
  const lines = useStore(cart);
  const count = cartCount(lines);

  if (variant === 'fab') {
    return (
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-lime px-5 py-3.5 text-slate font-semibold shadow-glow hover:scale-105 active:scale-95 transition-transform"
        aria-label="Відкрити замовлення"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
        <span>Замовлення{count > 0 ? ` · ${count}` : ''}</span>
      </button>
    );
  }

  return (
    <button
      onClick={openCart}
      className="relative pill hover:border-lime/60 transition-colors"
      aria-label="Відкрити замовлення"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-lime px-1 text-[11px] font-bold text-slate">
          {count}
        </span>
      )}
    </button>
  );
}
