# MPL INTERNATIONAL - B2B Logistics & Security Ecosystem
## MASTER DOCUMENT v2.0 + Инфраструктура Hetzner/nazwa.pl

**Основатель:** Олег Зуевский (Oleg Zujewski)
**Дата:** 27.09.2026
**Домен:** karta-pobytu-pomoc.pl
**Сервер:** Hetzner 46.224.198.66

### Часть 1. Инфраструктура (Hetzner + nazwa.pl)

Для индексации Telegram-бота нужен публичный лендинг-якорь. Google не индексирует Bot API.

**DNS-конфигурация nazwa.pl:**
- `@ A 46.224.198.66` - главный домен на Hetzner
- `* A 46.224.198.66` - все субдомены
- `CAA 0 issue "letsencrypt.org"` - SSL
- `CAA 0 issuewild "letsencrypt.org"` - Wildcard SSL
- `TXT "v=spf1 mx a ~all"` - почта
- `TXT "google-site-verification=..."` - GSC

**Архитектура:** Nginx на Hetzner + Let's Encrypt + SEO-лендинг с Deep Link в Telegram.

### Часть 2. Мастер-Спецификация MPL INTERNATIONAL v2.0

**1. Реквизиты и инвестиции**
- Компания: MPL INTERNATIONAL
- Валидатор: Письмо поддержки от Ministerstwo Rozwoju i Technologii + заявка PARP
- Бюджет: 4 000 000 - 12 000 000 PLN
- Seed: Нужно 25% wkład własny (€50k-€100k) для разблокировки 75-80% гранта PARP FENG / Ścieżka Smart
- Цель MVP: Figma-прототип для ангельских инвесторов

**2. 4 Ключевых Модуля (Pillars)**

**Pillar 1: Freight & Freight Aggregation**
- Динамический расчет маршрутов (пробки, топливо, CO2)
- Мультимодальные перевозки, совместимость с AEOLIX (ER TICO)
- GPS-трекинг realtime, Push-уведомления
- Интеграции: GUS API (REGON/NIP), BLIK, Google Maps / Mapbox

**Pillar 2: Warehouse Management (WMS)**
- 2D-визуализация стеллажей и паллетомест
- Монетизация 3PL через спотовое бронирование
- Сканирование штрих/QR камерой, фотофиксация повреждений
- Адресное хранение, маршрут сборки, авто-печать WZ/CMR

**Pillar 3: Automated Cargo & OCP Insurance**
- Мгновенная выписка OCP и Cargo в процессе заказа
- Оценка рисков по грузу/маршруту
- REST API: PZU, Warta, Ergo Hestia

**Pillar 4: Armed Escort & Security**
- Аудит объектов, скоринг рисков
- Вооруженное сопровождение по PL и EU, патрулирование стоянок
- SOS / Panic Button -> ПЦН + 112, телеметрия вскрытия
- Driver Incentive System: премии, бонусы, приоритетные фрахты

**3. Технологический Стек (GCP)**
- Mobile: Flutter (4 роли: Client, Driver, Warehouse Manager, Security Dispatcher)
- Backend: Google Cloud Run (Node.js/Go microservices)
- DB: Cloud SQL PostgreSQL + PostGIS
- AI: Vertex AI / Gemini 1.5 Pro (OCR для CMR, WZ, NIP)
- Infra: Hetzner VPS (landing) + GCP (core)

**4. Ролевая Матрица**
- Грузовладелец: Поиск фрахта/складов, страховка, охрана, оплата BLIK
- Водитель: Дашборд рейса, навигация, SOS, бонусы за помощь
- Складской менеджер: 2D-карта, приемка QR, WZ/CMR
- Диспетчер охраны: Пульт мониторинга, назначение экипажей Solid/Securitas

**5. Roadmap**
- Фаза 1 (Сейчас): Завершение BRD и репозиторий GitHub (master)
- Фаза 2: Схема PostgreSQL/PostGIS + REST/gRPC API
- Фаза 3: Figma-прототип Happy Path (фрахт+склад+полис+охрана)
- Фаза 4: Pitch Deck + документы Минэкономики + Google for Startups Warsaw
