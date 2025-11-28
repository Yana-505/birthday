# DR - Одностраничное приложение

Современное одностраничное приложение на React, TypeScript и Tailwind CSS, готовое к деплою на GitHub Pages.

> 💡 Этот проект был создан с помощью [Cursor](https://cursor.sh) - AI-powered code editor.

## Технологии

- ⚛️ React 18
- 📘 TypeScript
- 🎨 Tailwind CSS
- ⚡ Vite
- 📦 GitHub Pages

## Установка

```bash
yarn install
```

## Разработка

Запуск dev-сервера:

```bash
yarn dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## Сборка

Создание production сборки:

```bash
yarn build
```

## Деплой на GitHub Pages

1. Убедитесь, что у вас установлены зависимости:
   ```bash
   yarn install
   ```

2. Запустите деплой:
   ```bash
   yarn deploy
   ```

3. В настройках репозитория GitHub перейдите в раздел "Pages" и выберите источник `gh-pages` branch

4. Ваш сайт будет доступен по адресу: `https://[ваш-username].github.io/birthday/`

## Структура проекта

```
dr/
├── src/
│   ├── App.tsx          # Главный компонент
│   ├── main.tsx         # Точка входа
│   └── index.css        # Глобальные стили с Tailwind
├── index.html           # HTML шаблон
├── vite.config.ts       # Конфигурация Vite
├── tailwind.config.js   # Конфигурация Tailwind
├── tsconfig.json        # Конфигурация TypeScript
└── package.json         # Зависимости проекта
```

## Важные замечания

- В `vite.config.ts` указан `base: '/birthday/'` - это путь к репозиторию на GitHub Pages. Если ваш репозиторий называется по-другому, измените это значение.
- После деплоя может потребоваться несколько минут, чтобы изменения появились на сайте.

