export const mockCards = [
  {
    id: 1,
    title: 'Торговый бот №1',
    status: 'Active' as const,
    description:
      'Автоматическая торговля на бирже Binance с использованием стратегии усреднения. Работает с парами BTC/USDT, ETH/USDT.',
  },
  {
    id: 2,
    title: 'Арбитражный бот',
    status: 'Stopped' as const,
    description:
      'Отслеживание разницы цен между биржами Binance и Huobi для получения арбитражной прибыли.',
  },
  {
    id: 3,
    title: 'Скальпинг бот',
    status: 'Active' as const,
    description:
      'Высокочастотная торговля на небольших движениях цены. Специализируется на парах с высокой ликвидностью.',
  },
  {
    id: 4,
    title: 'DCA бот',
    status: 'Active' as const,
    description:
      'Бот для усреднения позиций по заданному расписанию. Автоматические покупки каждую неделю.',
  },
  {
    id: 5,
    title: 'Индикаторный бот',
    status: 'Stopped' as const,
    description: 'Торговля на основе технических индикаторов RSI, MACD и Moving Average.',
  },
  {
    id: 6,
    title: 'Grid бот',
    status: 'Active' as const,
    description:
      'Сетка ордеров для торговли в боковом тренде. Автоматическое создание сетки buy/sell ордеров.',
  },
  {
    id: 7,
    title: 'Новостной бот',
    status: 'Active' as const,
    description:
      'Анализ новостного фона и торговля на основе важных новостей крипторынка.',
  },
  {
    id: 8,
    title: 'Futures бот',
    status: 'Stopped' as const,
    description:
      'Торговля фьючерсами с leverage x5. Включает механизмы управления рисками и stop-loss.',
  },
  {
    id: 9,
    title: 'Мартингейл бот',
    status: 'Active' as const,
    description:
      'Торговая система на основе стратегии Мартингейла с защитой от просадок.',
  },
  {
    id: 10,
    title: 'Сигнальный бот',
    status: 'Active' as const,
    description:
      'Отслеживание и копирование сделок успешных трейдеров. Автоматическое исполнение сигналов.',
  },
]
