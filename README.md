# Hellmuth & Rühling — Rechtsanwälte Leipzig

Современный веб-сайт юридической фирмы с 3D-графикой и интерактивными элементами.

## 🚀 Технологии

- **TanStack Start** — React Router v7
- **React 19** — последняя версия
- **TypeScript** — типизация
- **Tailwind CSS v4** — стилизация
- **Three.js** — 3D графика
- **Radix UI** — доступные UI компоненты
- **Vite** — сборщик

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🏗️ Сборка

```bash
npm run build
```

## 🌐 Деплой на Vercel

### Автоматический деплой

1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите **"Add New Project"**
3. Импортируйте репозиторий `wikki5877-ui/ethereal-engine-craft-main`
4. Vercel автоматически определит настройки из `vercel.json`
5. Нажмите **"Deploy"**

### Через CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel

# Деплой в продакшн
vercel --prod
```

## 📝 Структура проекта

```
src/
├── components/       # React компоненты
│   ├── ui/          # UI компоненты (Radix UI)
│   ├── Contact.tsx  # Секция контактов
│   ├── InkField.tsx # Чернильная анимация
│   ├── Sculpt3D.tsx # 3D скульптура
│   └── ...
├── routes/          # Маршруты приложения
├── hooks/           # React хуки
├── lib/             # Утилиты
└── styles.css       # Глобальные стили
```

## 🎨 Особенности

- ✨ Интерактивная 3D-скульптура с Three.js
- 🎭 Чернильная анимация на фоне
- 📱 Адаптивный дизайн
- ⚡ Быстрая загрузка с Vite
- 🎯 SEO-оптимизация
- ♿ Доступность (WCAG)

## 📄 Лицензия

© 2026 Hellmuth & Rühling
