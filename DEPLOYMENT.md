# 🚀 Инструкция по деплою на Vercel

## Способ 1: Через веб-интерфейс Vercel (рекомендуется)

### Шаг 1: Подготовка
1. Убедитесь, что проект загружен на GitHub: ✅
   - Репозиторий: `https://github.com/wikki5877-ui/ethereal-engine-craft-main`

### Шаг 2: Импорт проекта в Vercel
1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите **"Add New..."** → **"Project"**
4. Найдите репозиторий `ethereal-engine-craft-main`
5. Нажмите **"Import"**

### Шаг 3: Настройка проекта
Vercel автоматически определит настройки из `vercel.json`:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`
- **Install Command**: `npm install`

### Шаг 4: Деплой
1. Проверьте настройки
2. Нажмите **"Deploy"**
3. Дождитесь завершения сборки (2-3 минуты)
4. Получите ссылку на ваш сайт: `https://your-project.vercel.app`

---

## Способ 2: Через Vercel CLI

### Установка CLI
```bash
npm i -g vercel
```

### Первый деплой
```bash
cd ethereal-engine-craft-main
vercel
```

Следуйте инструкциям:
- **Set up and deploy**: Yes
- **Which scope**: Ваш аккаунт
- **Link to existing project**: No
- **Project name**: ethereal-engine-craft-main
- **Directory**: ./
- **Override settings**: No

### Деплой в продакшн
```bash
vercel --prod
```

---

## 🔧 Настройки Vercel (опционально)

### Переменные окружения
Если нужны переменные окружения:
1. В Vercel Dashboard → Settings → Environment Variables
2. Добавьте переменные из `.env.example`

### Домен
1. В Vercel Dashboard → Settings → Domains
2. Добавьте свой домен
3. Настройте DNS записи

### Регион
По умолчанию используется регион `fra1` (Франкфурт, Германия)
Можно изменить в `vercel.json`:
```json
{
  "regions": ["fra1"]
}
```

---

## 📊 Мониторинг

После деплоя доступны:
- **Analytics**: статистика посещений
- **Logs**: логи сервера
- **Speed Insights**: метрики производительности

---

## 🔄 Автоматический деплой

После первого деплоя:
- Каждый `git push` в `main` → автоматический деплой в продакшн
- Каждый Pull Request → preview деплой

---

## ⚠️ Возможные проблемы

### Ошибка сборки
```bash
# Проверьте локально
npm run build
```

### Ошибка зависимостей
```bash
# Очистите кэш и переустановите
rm -rf node_modules package-lock.json
npm install
```

### Ошибка Node версии
В `package.json` добавьте:
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## 📞 Поддержка

- [Vercel Documentation](https://vercel.com/docs)
- [TanStack Start Docs](https://tanstack.com/start)
- [GitHub Issues](https://github.com/wikki5877-ui/ethereal-engine-craft-main/issues)
