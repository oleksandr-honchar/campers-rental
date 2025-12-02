# Campers Rental - Next.js Application

## ��� Опис проєкту

Веб-додаток для перегляду та бронювання кемперів, створений з використанням Next.js, TypeScript та Zustand.

## ��� Основні функції

- Перегляд каталогу кемперів
- Фільтрація за локацією, типом кузова та обладнанням
- Детальна інформація про кожен кемпер
- Додавання кемперів до обраного
- Форма бронювання
- Відгуки користувачів

## ��� Технології

- **Next.js 14** (App Router)
- **TypeScript**
- **Zustand** (управління станом)
- **Axios** (HTTP запити)
- **Module CSS** (стилізація)

## ��� Встановлення

\`\`\`bash
# Клонування репозиторію
git clone <repository-url>

# Перехід в директорію проєкту
cd campers-rental

# Встановлення залежностей
npm install

# Запуск проєкту в режимі розробки
npm run dev
\`\`\`

Додаток буде доступний за адресою: http://localhost:3000

## ��� Структура проєкту

\`\`\`
src/
├── app/              # Next.js App Router
├── components/       # React компоненти
├── types/           # TypeScript типи
├── services/        # API сервіси
├── store/           # Zustand стори
├── utils/           # Допоміжні функції
└── constants/       # Константи
\`\`\`

## ��� API

Проєкт використовує MockAPI:
- Base URL: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
- Документація: https://github.com/mockapi-io/docs/wiki

## ��� Автор

Олександр Гончар

## ��� Ліцензія

MIT
