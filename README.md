Проект переведен на `Next.js` с режимом статической сборки (`output: 'export'`).

## Команды

- `npm run dev` — локальная разработка
- `npm run build` — production build (`.next/`, for `next start`)
- `npm run build:static` — static export to `out/` (used for cPanel deployment)
- `npm run export` — alias for `build:static`
- `npm run preview` — локальный просмотр статического `out/`
- `npm run lint` — eslint
- `npm run typecheck` — tsc --noEmit
- `npm run seo:check` — проверка SEO собранного `out/` (после `build:static`)

## Переменные окружения

См. `.env.example`.

- `NEXT_PUBLIC_SITE_URL` — канонический origin (по умолчанию `https://onlan.com.ua`). Единственный источник домена: canonical, Open Graph, `robots.txt`, `sitemap.xml`, `.htaccess`. На staging укажите домен staging, чтобы canonical не указывал на прод.
- `NEXT_PUBLIC_SEO_INDEXING` — `false` отключает индексацию (noindex + `Disallow: /`), `true` — включает принудительно. Без переменной индексируется только production-сборка.
- `NEXT_PUBLIC_GTM_ID` — GTM ID для клиентской инициализации
- `NEXT_PUBLIC_CONTACT_FORM_URL` или `NEXT_PUBLIC_CONTACT_EMAIL` — куда отправлять форму на странице контактов

## Структура

- `src/app/` — маршруты Next.js (App Router)
- `src/` — UI-компоненты и бизнес-логика
- `public/` — статические ассеты

## SEO

Единый источник правды:

- `src/lib/site.ts` — канонический origin, признак индексируемости окружения, `absoluteUrl()`
- `src/lib/routes.ts` — реестр публичных маршрутов: title/description/`lastmod`/хлебные крошки
- `src/lib/seo.ts` — фабрики `Metadata` (title, description, canonical, robots, OG, Twitter)
- `src/lib/structuredData.ts` — JSON-LD (`@graph`, ссылки через `@id`)
- `src/app/robots.ts`, `src/app/sitemap.ts` — генерируются из того же реестра
- `scripts/generate-htaccess.mjs` — `out/.htaccess` для Apache/cPanel: HTTPS + www→non-www, слэши, чистые URL, `ErrorDocument 404`, заголовки кеша и безопасности
- `scripts/seo-check.mjs` — проверка собранного `out/`

Добавление публичной страницы: создать маршрут в `src/app/`, добавить запись в `STATIC_ROUTES`
(`src/lib/routes.ts`) — метаданные, canonical, sitemap и хлебные крошки подтянутся автоматически.
При изменении контента обновите `CONTENT_LAST_MODIFIED` в `src/lib/routes.ts`.

Проверка:

```bash
npm run build:static && npm run seo:check
```

`seo:check` валидирует title/description (уникальность и длина), canonical, robots, OG/Twitter,
единственный `<h1>`, `alt` у изображений, синтаксис JSON-LD, соответствие `sitemap.xml` набору
canonical-адресов и отсутствие битых внутренних ссылок.

## Деплой на cPanel (Git)

1. У файле `.cpanel.yml` замените `USERNAME` на имя вашего cPanel-аккаунта в `DEPLOYPATH` (обычно `/home/ваш_логин/public_html/`).
2. Закоммитьте и запушьте `.cpanel.yml` в репозиторий, который подключён в cPanel.
3. В cPanel → **Git Version Control** нажмите **Update from Remote**, затем **Deploy HEAD Commit**.
4. Если появляется ошибка *«No uncommitted changes»* — на **сервере** в клоне репозитория не должно быть локальных правок. Сбросьте их (discard) или сделайте pull без изменений в рабочей копии на хостинге.

Локально перед push: `git status` должен показывать *working tree clean*.

> `build:static` кладёт в `out/.htaccess` сгенерированные правила Apache (HTTPS + канонический
> хост, нормализация слэшей, чистые URL без `.html`, `ErrorDocument 404`, кеш и заголовки
> безопасности). При деплое он копируется в `public_html` и **перезаписывает** существующий
> `.htaccess` — если на хостинге есть свои правила, перенесите их в
> `scripts/generate-htaccess.mjs`.
