import { atom } from 'nanostores';

export type CartLine = {
  id: string;
  name: string;
  size: string;
  milk: string;
  extraShot: boolean;
  syrup: string;
  unitPrice: number;
  qty: number;
};

export const cart = atom<CartLine[]>([]);

export function addToCart(line: Omit<CartLine, 'id'>) {
  const id = [line.name, line.size, line.milk, line.extraShot, line.syrup].join('|');
  const current = cart.get();
  const existing = current.find((l) => l.id === id);
  if (existing) {
    cart.set(
      current.map((l) => (l.id === id ? { ...l, qty: l.qty + line.qty } : l))
    );
  } else {
    cart.set([...current, { ...line, id }]);
  }
}

export function removeFromCart(id: string) {
  cart.set(cart.get().filter((l) => l.id !== id));
}

export function setQty(id: string, qty: number) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  cart.set(cart.get().map((l) => (l.id === id ? { ...l, qty } : l)));
}

export function clearCart() {
  cart.set([]);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export const isCartOpen = atom<boolean>(false);
export function openCart() {
  isCartOpen.set(true);
}
export function closeCart() {
  isCartOpen.set(false);
}
