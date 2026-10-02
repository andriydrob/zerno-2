import { useEffect, useMemo, useState } from 'react';
import { addToCart } from '../stores/cart';

type Size = { label: string; price: number };

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: number;
  sizes?: Size[];
  glutenFree?: boolean;
  vegan?: boolean;
  sugarFree?: boolean;
  customizable?: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
};

const MILK_OPTIONS = ['Вівсяне', 'Коров\u2019яче', 'Мигдальне', 'Кокосове'];
const SYRUP_OPTIONS = ['Без сиропу', 'Ванільний', 'Карамельний', 'Лавандовий'];

const categories: Category[] = [
  {
    id: 'coffee',
    label: 'Кава',
    icon: '☕',
    items: [
      { id: 'espresso', name: 'Еспресо', description: 'Спешелті арабіка, щільне тіло з яскравою кислинкою', price: 55, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'doppio', name: 'Допіо', description: 'Подвійна порція еспресо для швидкого заряду', price: 70, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'americano', name: 'Американо', description: 'Еспресо з гарячою водою, зерно на вибір', sizes: [{ label: '250 мл', price: 60 }, { label: '350 мл', price: 75 }], glutenFree: true, vegan: true, sugarFree: true },
      { id: 'cortado', name: 'Кортадо', description: 'Еспресо з невеликою кількістю теплого молока', price: 80, glutenFree: true, customizable: true, sugarFree: true },
      { id: 'flat-white', name: 'Флет вайт', description: 'Подвійний еспресо, тонкий шар молока', price: 85, glutenFree: true, customizable: true, sugarFree: true },
      { id: 'cappuccino', name: 'Капучино', description: 'Класична пропорція, вівсяне — без доплати', sizes: [{ label: '250 мл', price: 75 }, { label: '350 мл', price: 90 }], glutenFree: true, customizable: true, sugarFree: true },
      { id: 'latte', name: 'Лате', description: 'Ніжна молочна піна, м\u2019який кавовий смак', sizes: [{ label: '250 мл', price: 80 }, { label: '350 мл', price: 95 }], glutenFree: true, customizable: true, sugarFree: true },
      { id: 'raf', name: 'Раф', description: 'Ванільний сироп власного приготування', price: 90, glutenFree: true, customizable: true },
      { id: 'mocha', name: 'Мокко', description: 'Еспресо, гарячий шоколад, молоко, збиті вершки', price: 95, glutenFree: true, customizable: true },
      { id: 'cocoa', name: 'Какао', description: 'Нідерландський какао-порошок на незбираному молоці', sizes: [{ label: '250 мл', price: 75 }, { label: '350 мл', price: 90 }], glutenFree: true, customizable: true },
      { id: 'iced-americano', name: 'Айс Американо', description: 'Еспресо, холодна вода, лід', sizes: [{ label: '300 мл', price: 70 }, { label: '400 мл', price: 85 }], glutenFree: true, vegan: true, sugarFree: true },
      { id: 'espresso-tonic', name: 'Еспресо-тонік', description: 'Крафтовий тонік, натуральний сік лайма, еспресо', price: 115, glutenFree: true, vegan: true }
    ]
  },
  {
    id: 'matcha',
    label: 'Матча',
    icon: '🍵',
    items: [
      { id: 'matcha-latte', name: 'Матча лате', description: 'Церемоніальний клас, на вівсяному', sizes: [{ label: '250 мл', price: 95 }, { label: '350 мл', price: 110 }], glutenFree: true, vegan: true, customizable: true },
      { id: 'matcha-tonic', name: 'Матча-тонік', description: 'Японська матча, грейпфрутовий тонік, лід', price: 110, glutenFree: true, vegan: true },
      { id: 'iced-matcha-latte', name: 'Айс матча лате', description: 'Холодна матча на кокосовому молоці, лід', sizes: [{ label: '300 мл', price: 100 }, { label: '400 мл', price: 115 }], glutenFree: true, vegan: true },
      { id: 'matcha-coconut', name: 'Матча з кокосовим молоком', description: 'Густіша текстура, легка солодкість кокосу', price: 115, glutenFree: true, vegan: true },
      { id: 'matcha-classic', name: 'Класична церемоніальна матча', description: 'Збита віничком, без молока, вода 75°C', price: 90, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'matcha-lemonade', name: 'Матча-лимонад', description: 'Матча, свіжий лимон, содова, м\u2019ята', price: 105, glutenFree: true, vegan: true }
    ]
  },
  {
    id: 'tea',
    label: 'Чай',
    icon: '🍃',
    items: [
      { id: 'oolong', name: 'Улун Да Хун Пао', description: 'Три доливи, подаємо в глиняному чайнику', price: 110, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'black-thyme', name: 'Чорний з чебрецем', description: 'Суміш власного купажу', price: 65, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'sencha', name: 'Зелений Сеньча', description: 'Класичний японський зелений чай з трав\u2019янистим тоном', price: 70, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'jasmine', name: 'Чай з жасмином', description: 'Зелена основа, пелюстки жасмину', price: 70, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'herbal-evening', name: 'Трав\u2019яний збір «Вечірній»', description: 'Ромашка, м\u2019ята, звіробій', price: 75, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'puer', name: 'Чай Пуер витриманий', description: 'Насичений, земляний, 5 років витримки', price: 95, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'sea-buckthorn', name: 'Обліпиховий чай', description: 'Свіжа обліпиха, апельсин, розмарин, мед', price: 85, glutenFree: true, vegan: true },
      { id: 'ginger-lemon', name: 'Імбирно-лимонний чай', description: 'Корінь імбиру, лимонний фреш, м\u2019ята, мед', price: 85, glutenFree: true, vegan: true }
    ]
  },
  {
    id: 'breakfast',
    label: 'Сніданки',
    icon: '🍳',
    items: [
      { id: 'granola', name: 'Гранола з йогуртом', description: 'Сезонні ягоди, мед з пасіки під Києвом', price: 135 },
      { id: 'avocado-toast', name: 'Тост з авокадо', description: 'Яйце пашот, чилі-олія, крем-сир, зерновий хліб', price: 165 },
      { id: 'avocado-toast-vegan', name: 'Тост з авокадо (веган)', description: 'Без яйця, хумус замість крем-сиру, насіння чіа', price: 155, vegan: true },
      { id: 'shakshuka', name: 'Шакшука', description: 'Три яйця у соусі з томатів і печеного перцю, домашній хліб', price: 175, glutenFree: true },
      { id: 'syrnyky', name: 'Сирники з соусом солона карамель', description: 'З домашнього сиру, подаємо зі сметаною та ягодами', price: 150 },
      { id: 'salmon-scramble', name: 'Скрембл із лососем', description: 'Ніжні яйця, слабосолений лосось, мікс салату, бріош', price: 210 },
      { id: 'oat-porridge', name: 'Овсяна каша на рослинному молоці', description: 'З горіхами пекан, бананом і насінням чіа', price: 120, vegan: true },
      { id: 'tofu-quinoa-bowl', name: 'Боул з тофу та кіноа', description: 'Печена тофу, авокадо, едамаме, кунжутний соус', price: 160, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'chia-pudding', name: 'Чіа-пудинг на кокосовому молоці', description: 'Манго, свіжа м\u2019ята, без доданого цукру', price: 110, glutenFree: true, vegan: true, sugarFree: true }
    ]
  },
  {
    id: 'desserts',
    label: 'Десерти',
    icon: '🍰',
    items: [
      { id: 'cheesecake', name: 'Чізкейк баскський', description: 'Печеться щоранку у сусідній пекарні', price: 110 },
      { id: 'medovyk', name: 'Медовик', description: 'За бабусиним рецептом власниці', price: 95 },
      { id: 'raspberry-tart', name: 'Тарталетка з малиною', description: 'Пісочна основа, заварний крем, свіжа малина', price: 120 },
      { id: 'choux', name: 'Тістечко Шу', description: 'Заварне тісто, кракелін, ванільний крем Маскарпоне', price: 85 },
      { id: 'macaron', name: 'Макарон (в асортименті)', description: 'Солона карамель, фісташка, дорблю-горіх', price: 55, glutenFree: true },
      { id: 'vegan-brownie', name: 'Веганський брауні', description: 'Темний шоколад, горіх пекан, без глютену та цукру', price: 100, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'raw-cashew-cheesecake', name: 'Веганський чізкейк на кешью', description: 'Без випікання, підсолоджений фініками', price: 130, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'date-protein-balls', name: 'Протеїнові кульки з фініками й какао', description: 'Без доданого цукру, джерело клітковини', price: 65, glutenFree: true, vegan: true, sugarFree: true },
      { id: 'coconut-berry-cake', name: 'Кокосове тістечко з ягодами', description: 'На еритритолі, без доданого цукру', price: 95, glutenFree: true, vegan: true, sugarFree: true }
    ]
  }
];

const allItems = categories.flatMap((c) => c.items.map((item) => ({ ...item, categoryId: c.id, categoryLabel: c.label })));

function fmt(price: number) {
  return `${price} грн`;
}

export default function MenuSection() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [veganView, setVeganView] = useState(false);
  const [query, setQuery] = useState('');
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);
  const [onlySugarFree, setOnlySugarFree] = useState(false);
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  function passesFilters(item: MenuItem) {
    if (onlyGlutenFree && !item.glutenFree) return false;
    if (onlySugarFree && !item.sugarFree) return false;
    if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
    return true;
  }

  const categoryItems = useMemo(() => active.items.filter(passesFilters), [active, query, onlyGlutenFree, onlySugarFree]);

  const veganGroups = useMemo(() => {
    return categories
      .map((c) => ({ ...c, items: c.items.filter((i) => i.vegan).filter(passesFilters) }))
      .filter((c) => c.items.length > 0);
  }, [query, onlyGlutenFree, onlySugarFree]);

  function selectCategory(id: string) {
    setVeganView(false);
    setActiveId(id);
  }

  function openDrawer(item: MenuItem) {
    setOpenItem(item);
  }

  function renderItem(item: MenuItem) {
    const displayPrice = item.sizes ? item.sizes[0].price : item.price ?? 0;
    return (
      <li
        key={item.id}
        className="flex items-start justify-between gap-4 rounded-2xl border border-transparent hover:border-slate-border hover:bg-slate-soft/40 transition-colors p-3 -mx-3 cursor-pointer"
        onClick={() => openDrawer(item)}
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[16px] text-cream">{item.name}</p>
            {item.vegan && <span className="text-[11px] text-lime/80 border border-lime/30 rounded-full px-2 py-0.5">Vegan</span>}
            {item.glutenFree && <span className="text-[11px] text-cream/50 border border-slate-border rounded-full px-2 py-0.5">GF</span>}
            {item.sugarFree && <span className="text-[11px] text-cream/50 border border-slate-border rounded-full px-2 py-0.5">Без цукру</span>}
          </div>
          <p className="text-sm text-cream/50 mt-0.5">{item.description}</p>
          {item.sizes && (
            <p className="text-xs text-cream/35 mt-1">
              {item.sizes.map((s) => `${s.label} · ${fmt(s.price)}`).join('   ·   ')}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="font-display font-semibold text-lime">{fmt(displayPrice)}</span>
          <p className="text-[11px] text-cream/35 mt-1">Додати →</p>
        </div>
      </li>
    );
  }

  return (
    <div>
      <div role="tablist" aria-label="Категорії меню" className="flex flex-wrap items-center gap-2 mb-2">
        {categories.map((category) => {
          const isActive = !veganView && category.id === activeId;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => selectCategory(category.id)}
              className={
                'rounded-full px-4 py-2 text-[15px] transition-all border flex items-center gap-1.5 ' +
                (isActive
                  ? 'bg-lime text-slate border-lime shadow-glow'
                  : 'border-slate-border text-cream/70 hover:border-cream/30')
              }
            >
              <span>{category.icon}</span>
              {category.label}
              <span className={isActive ? 'text-slate/60' : 'text-cream/35'}>· {category.items.length}</span>
            </button>
          );
        })}

        <span className="w-px h-6 bg-slate-border mx-1" aria-hidden="true" />

        <button
          role="tab"
          aria-selected={veganView}
          onClick={() => setVeganView((v) => !v)}
          className={
            'rounded-full px-4 py-2 text-[15px] transition-all border flex items-center gap-1.5 ' +
            (veganView
              ? 'bg-lime text-slate border-lime shadow-glow'
              : 'border-lime/40 text-lime/90 hover:border-lime/70')
          }
        >
          🌱 Веган меню
          <span className={veganView ? 'text-slate/60' : 'text-lime/50'}>
            · {allItems.filter((i) => i.vegan).length}
          </span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10 mt-6">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук у меню…"
            className="w-full rounded-full border border-slate-border bg-slate-soft/60 pl-10 pr-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-lime/50 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOnlyGlutenFree((v) => !v)}
            className={'pill transition-colors ' + (onlyGlutenFree ? 'border-lime/60 text-lime bg-lime/10' : 'text-cream/60')}
          >
            Без глютену
          </button>
          <button
            onClick={() => setOnlySugarFree((v) => !v)}
            className={'pill transition-colors ' + (onlySugarFree ? 'border-lime/60 text-lime bg-lime/10' : 'text-cream/60')}
          >
            Без цукру
          </button>
        </div>
      </div>

      {veganView ? (
        veganGroups.length === 0 ? (
          <p className="text-cream/50 py-10 text-center">Нічого не знайдено — спробуй інший запит або фільтр.</p>
        ) : (
          <div className="space-y-10">
            {veganGroups.map((group) => (
              <div key={group.id}>
                <p className="text-sm text-cream/40 mb-3 flex items-center gap-1.5">
                  <span>{group.icon}</span> {group.label}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">{group.items.map(renderItem)}</ul>
              </div>
            ))}
          </div>
        )
      ) : categoryItems.length === 0 ? (
        <p className="text-cream/50 py-10 text-center">Нічого не знайдено — спробуй інший запит або фільтр.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">{categoryItems.map(renderItem)}</ul>
      )}

      {openItem && <CustomizerDrawer item={openItem} onClose={() => setOpenItem(null)} />}
    </div>
  );
}

function ItemImage({ item }: { item: MenuItem }) {
  const [error, setError] = useState(false);
  const src = `/menu/${item.id}.jpg`;

  if (error) {
    return (
      <div className="aspect-[16/10] bg-slate border-b border-slate-border rounded-t-3xl sm:rounded-none flex flex-col items-center justify-center gap-2">
        <span className="text-3xl opacity-30">🖼️</span>
        <p className="text-xs text-cream/30 px-4 text-center">
          Додай фото: public/menu/{item.id}.jpg
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={item.name}
      onError={() => setError(true)}
      className="w-full aspect-[16/10] object-cover rounded-t-3xl sm:rounded-none"
    />
  );
}

function CustomizerDrawer({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const sizes = item.sizes ?? null;
  const showSizePicker = !!sizes && sizes.length > 1;
  const showCustomization = !!item.customizable;

  const [size, setSize] = useState(sizes ? sizes[0] : null);
  const [milk, setMilk] = useState(MILK_OPTIONS[0]);
  const [extraShot, setExtraShot] = useState(false);
  const [syrup, setSyrup] = useState(SYRUP_OPTIONS[0]);
  const [qty, setQty] = useState(1);

  const extraShotPrice = 15;
  const basePrice = size ? size.price : item.price ?? 0;
  const unitPrice = basePrice + (showCustomization && extraShot ? extraShotPrice : 0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function confirm() {
    addToCart({
      name: item.name,
      size: size?.label ?? '—',
      milk: showCustomization ? milk : '—',
      extraShot: showCustomization ? extraShot : false,
      syrup: showCustomization ? syrup : '—',
      unitPrice,
      qty
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end">
      <div className="absolute inset-0 bg-black/60 animate-fade" onClick={onClose} />
      <div className="relative w-full sm:w-[420px] max-h-[90dvh] sm:h-full sm:max-h-none bg-slate-soft border-t sm:border-t-0 sm:border-l border-slate-border rounded-t-3xl sm:rounded-none animate-sheet sm:animate-drawer overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-10">
          <ItemImage item={item} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 pill h-9 w-9 !px-0 justify-center bg-slate/70 backdrop-blur"
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <p className="section-label mb-1">Налаштувати</p>
            <h3 className="text-2xl font-semibold text-cream">{item.name}</h3>
          </div>

          <div className="space-y-6">
          {showSizePicker && (
            <div>
              <p className="text-sm text-cream/50 mb-2">Розмір</p>
              <div className="flex gap-2">
                {sizes!.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSize(s)}
                    className={
                      'rounded-full px-4 py-2 text-sm border transition-colors ' +
                      (size?.label === s.label ? 'bg-lime text-slate border-lime' : 'border-slate-border text-cream/70 hover:border-cream/30')
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showCustomization && (
            <>
              <div>
                <p className="text-sm text-cream/50 mb-2">Молоко</p>
                <div className="flex flex-wrap gap-2">
                  {MILK_OPTIONS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilk(m)}
                      className={
                        'rounded-full px-4 py-2 text-sm border transition-colors ' +
                        (milk === m ? 'bg-lime text-slate border-lime' : 'border-slate-border text-cream/70 hover:border-cream/30')
                      }
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-cream/50 mb-2">Сироп</p>
                <div className="flex flex-wrap gap-2">
                  {SYRUP_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSyrup(s)}
                      className={
                        'rounded-full px-4 py-2 text-sm border transition-colors ' +
                        (syrup === s ? 'bg-lime text-slate border-lime' : 'border-slate-border text-cream/70 hover:border-cream/30')
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center justify-between rounded-2xl border border-slate-border px-4 py-3 cursor-pointer">
                <span className="text-sm text-cream/80">Додатковий шот еспресо (+{extraShotPrice} грн)</span>
                <input type="checkbox" checked={extraShot} onChange={(e) => setExtraShot(e.target.checked)} className="accent-lime h-4 w-4" />
              </label>
            </>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-cream/50">Кількість</p>
            <div className="flex items-center gap-3 pill !px-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-7 w-7 grid place-items-center text-lg">−</button>
              <span className="w-4 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-7 w-7 grid place-items-center text-lg">+</button>
            </div>
          </div>
        </div>

        <button
          onClick={confirm}
          className="mt-8 w-full rounded-full bg-lime text-slate font-semibold py-3.5 hover:shadow-glow transition-shadow"
        >
          Додати до замовлення · {fmt(unitPrice * qty)}
        </button>
        </div>
      </div>
    </div>
  );
}