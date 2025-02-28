# Unistory React Hackathon Project

Unistory React Hackathon Project — это проект, разработанный для хакатона, на основе React, TypeScript и Vite с преднастроенной конфигурацией для разработки современных веб-приложений.

## 📦 Стек технологий

- **React 18** — основа приложения
- **TypeScript** — статическая типизация
- **Vite** — быстрый сборщик
- **Zustand** — управление состоянием
- **React Query** — работа с асинхронными запросами
- **React Hook Form + Zod** — управление формами и валидация
- **TailwindCSS** — стилизация
- **ESLint + Prettier** — линтинг и форматирование

## 🚀 Установка и запуск

### 1. Клонирование репозитория
```sh
git clone https://github.com/code0verdose/commer-frontend-web3-hackaton.git
cd commer-frontend-web3-hackaton
```

### 2. Установка зависимостей
```sh
npm install
```

### 3. Запуск в режиме разработки
```sh
npm dev
```

## 🛠 Сборка проекта

| Команда               | Описание |
|-----------------------|----------|
| `npm build:development` | Сборка для режима разработки |
| `npm build:staging`     | Сборка для тестового окружения |
| `npm build:production`  | Сборка для продакшена |
| `npm preview`           | Предпросмотр собранного проекта |

## 🔍 Анализ кода

| Команда               | Описание |
|-----------------------|----------|
| `npm lint`           | Проверка кода с ESLint |
| `npm lint:fix`       | Автоисправление ESLint ошибок |
| `npm prettier:fix`   | Форматирование кода Prettier |
| `npm check-types`    | Проверка типов TypeScript |

## 🔧 Переменные окружения

Перед запуском создайте файл `.env` и укажите необходимые переменные:

```env
VITE_BASE_API_URL=
VITE_DISCORD_BOT_INVITE_URL=

VITE_NETWORK_MODE=

VITE_FACTORY_ADDRESS=
VITE_TOKEN_ADDRESS=
VITE_AGENT_ADDRESS=

VITE_TOKEN_AMOUNT=
VITE_TOKEN_DECIMALS=
```

## 📄 Лицензия

Этот проект разработан командой **Unistory** в рамках хакатона и доступен для использования в соответствии с внутренними правилами компании.

