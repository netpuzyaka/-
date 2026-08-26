# Hryak Team — био-сайт

Персональный сайт-визитка команды **Hryak Team**: [imgenius_](https://discord.com/users/1099012863835783168) и [drbabaxa](https://discord.com/users/1323381913410601150).

Мы — пидоры ебаные:

- **Сайты:** React, HTML, CSS
- **Программы:** C#, C++, Python

> «Эра легендарного Hryak Team прошла, раньше мы были там в почете, теперь нас там знать не хотят...»

## Возможности

- Современный тёмный интерфейс на **React 19** + **Tailwind CSS v4** + **Framer Motion**
- Живые профили Discord в реальном времени (статус, аватар, активность, Spotify) через [Lanyard](https://github.com/Phineas/lanyard)
- Адаптивная вёрстка, анимации, скелетоны и обработка всех состояний загрузки

## Живые статусы Discord

Статусы транслируются через WebSocket Lanyard (`wss://api.lanyard.rest/socket`).

**Важно:** чтобы Lanyard начал отслеживать аккаунт, нужно один раз зайти на сервер [discord.gg/lanyard](https://discord.gg/lanyard). После этого статус появится на сайте автоматически — менять код не нужно.

Если профиль не отслеживается, на сайте отображается карточка с подсказкой.

## Запуск локально

```bash
npm install
npm run dev
```

Сборка и превью:

```bash
npm run build
npm run preview
```

## Деплой на Vercel

1. Импортируй этот репозиторий на [vercel.com](https://vercel.com)
2. Vercel сам определит фреймворк (Vite), команда сборки — `npm run build`, выходная папка — `dist`
3. Дополнительная настройка не требуется

## Структура

```
├── index.html              # точка входа
├── public/assets/          # статика (логотип, favicon)
├── src/
│   ├── App.jsx             # корневой компонент
│   ├── components/         # Header, Hero, About, Skills, DiscordProfiles, DiscordCard, Footer
│   └── hooks/useLanyard.js # WebSocket-подключение к Lanyard + REST fallback
└── vite.config.js          # Vite + React + Tailwind
```

## Лицензия

MIT
