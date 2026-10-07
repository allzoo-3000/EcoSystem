# MASTER DOCUMENT / GŁÓWNY DOKUMENT EKOSYSTEMU MPL INTERNATIONAL v2.0
**Wersja wielojęzyczna (Polski / Русский)**

---

## CZĘŚĆ I: WERSJA POLSKA (JĘZYK ORYGINALNY)

# Architektura Infrastruktury Sieciowej, Indeksacji Wyszukiwarkowej oraz Główna Specyfikacja Ekosystemu B2B Logistics & Security Ecosystem (MPL INTERNATIONAL v2.0)

### Część 1. Kontekst Infrastrukturalny i Powiązanie Sieciowe (Hetzner + nazwa.pl)

Integracja infrastruktury sieciowej w celu kierowania docelowego ruchu organicznego z wyszukiwarek do zamkniętych ekosystemów komunikatorów internetowych stanowi złożone zadanie inżynieryjne i SEO. Algorytm wyszukiwania Google nie posiada technicznej możliwości bezpośredniego skanowania, indeksowania i pozycjonowania wewnętrznych interfejsów botów konwersacyjnych Telegram działających w oparciu o protokół Telegram Bot API. W celu pokonania tego ograniczenia wymagane jest utworzenie publicznego węzła pośredniczącego (landing page), pełniącego rolę kotwicy wyszukiwania.

Powiązanie nazwy domenowej `karta-pobytu-pomoc.pl`, zarejestrowanej u polskiego rejestratora `nazwa.pl`, z serwerem dedykowanym Hetzner (adres IP: `46.224.198.66`) pozwala na zbudowanie bezawaryjnego łańcucha przekierowań. Przedstawione podejście architektoniczne zapewnia spełnienie wymagań Google w zakresie szybkości ładowania stron, ochrony kryptograficznej z wykorzystaniem protokołu HTTPS oraz poprawnego przekazywania kontekstu użytkownika poprzez mechanizmy głębokiego linkowania (Deep Linking).

#### Konfiguracja Strefy DNS w nazwa.pl

Zarządzanie autorytatywną strefą DNS domeny odbywa się poprzez panel zarządzania `nazwa.pl`. W celu poprawnego powiązania nazwy domenowej z serwerem Hetzner oraz zapewnienia możliwości wydawania bezpiecznych certyfikatów SSL wymagana jest precyzyjna konfiguracja rekordów zasobowych.

| Nazwa hosta | Typ rekordu | Wartość / Przeznaczenie | TTL (sek) | Rola infrastrukturalna |
| :--- | :--- | :--- | :--- | :--- |
| `@ (karta-pobytu-pomoc.pl)` | SOA | `ns1.nazwa.pl biuro.nazwa.pl ...` | 3600 | Wskazanie serwera autorytatywnego i parametrów strefy |
| `@ (karta-pobytu-pomoc.pl)` | NS | `ns1.nazwa.pl, ns2.nazwa.pl, ns3.nazwa.pl` | 3600 | Delegacja obsługi strefy DNS |
| `@ (karta-pobytu-pomoc.pl)` | A | `46.224.198.66` | 3600 | Przypisanie domeny głównej do adresu IPv4 Hetzner |
| `* (*.karta-pobytu-pomoc.pl)` | A | `46.224.198.66` | 3600 | Trasowanie wszystkich subdomen (w tym www) |
| `@ (karta-pobytu-pomoc.pl)` | CAA | `0 issue "letsencrypt.org"` | 3600 | Zezwolenie Let's Encrypt na wydawanie certyfikatów |
| `@ (karta-pobytu-pomoc.pl)` | CAA | `0 issuewild "letsencrypt.org"` | 3600 | Zezwolenie na wydawanie certyfikatów Wildcard |
| `@ (karta-pobytu-pomoc.pl)` | TXT | `"v=spf1 mx a ~all"` | 3600 | Autoryzacja serwerów pocztowych i ochrona przed spoofingiem |
| `@ (karta-pobytu-pomoc.pl)` | TXT | `"google-site-verification=..."` | 3600 | Potwierdzenie praw własności w Google Search Console |

---

### Część 2. Główna Specyfikacja i Architektura Ekosystemu B2B (MPL INTERNATIONAL v2.0)

#### 1. Dane Rejestrowe i Status Inwestycyjny

* **Nazwa firmy**: MPL INTERNATIONAL
* **Założyciel / Founder**: Oleg Zujewski (Oleg Zuiewski)
* **Data aktualizacji biznesplanu**: 2026 rok (dokument bazowy z dnia 08.06.2024)
* **Walidacja instytucjonalna**: Oficjalne pismo poparcia z Ministerstwa Rozwoju i Technologii oraz rozpatrzony wniosek w Polskiej Agencji Rozwoju Przedsiębiorczości (PARP).
* **Strategia inwestycyjna (Seed Round / Dotacja PARP)**:
  * Projekt wymaga 25% kapitału własnego/pozyskanego (wkład własny) w celu odblokowania 75–80% bezzwrotnego dofinansowania z PARP (programy FENG / Ścieżka Smart).
  * Całkowity szacowany budżet uruchomienia i pierwszego roku działalności: od 4 000 000 PLN do 12 000 000 PLN.
  * Cel MVP / Prototypu Figma: pozyskanie inwestorów anielskich na kwotę 25% współfinansowania (50 000 EUR – 100 000 EUR) pod gwarancję posiadanego poparcia państwowego.

---

#### 2. Szczegółowy Opis 4 Głównych Filarów (BRD)

##### Filar 1: Fracht i Agregacja Transportowa (Freight & Freight Aggregation)
* **Optymalizacja tras i algorytmy**:
  * Dynamiczne obliczanie optymalnych tras z uwzględnieniem natężenia ruchu, zużycia paliwa, masy ładunku oraz wskaźników ekologicznych (ślad węglowy / CO2).
  * Obsługa przewozów multimodalnych i intermodalnych (transport drogowy, kolejowy, morski, lotniczy).
  * Zgodność z normami europejskimi oraz kompatybilność z unijną platformą wymiany informacji logistycznych AEOLIX (ER TICO).
* **Monitoring i dyspozytura**:
  * Śledzenie pozycji GPS pojazdów oraz statusu ładunku w czasie rzeczywistym dla kierowcy, dyspozytora i odbiorcy.
  * System natychmiastowych powiadomień Push o opóźnieniach, zmianach harmonogramu lub zdarzeniach losowych.
* **Integracje**:
  * **GUS API (REGON/NIP)**: Automatyczna weryfikacja polskich kontrahentów podczas rejestracji.
  * **Bramki płatnicze BLIK / B2B**: Natychmiastowe płatności i preautoryzacja środków za fracht.
  * **Google Maps / Mapbox API**: Tworzenie stref geograficznych (geofencing) oraz nawigacja ciężarowa.

##### Filar 2: Zarządzanie Magazynem i Miejscami Paletowymi (WMS / Pallet Spaces)
* **Siatka 2D i wizualizacja**:
  * Interaktywna wizualizacja 2D systemów regałowych, poziomów oraz wolnych miejsc paletowych w magazynie w czasie rzeczywistym.
  * Monetyzacja nadwyżek powierzchni dla operatorów 3PL poprzez mechanizm natychmiastowej rezerwacji spotowej.
* **Operacje magazynowe i automatyzacja**:
  * **Przyjęcie towaru**: Rejestracja ładunków poprzez skanowanie kodów kreskowych/QR aparatem smartfona. Natywna dokumentacja fotograficzna uszkodzeń podczas rozładunku.
  * **Przechowywanie adresowe**: Automatyczne wskazywanie regału, półki i strefy w celu optymalnego rozmieszczenia.
  * **Kompletacja zamówień**: Wyznaczanie optymalnej ścieżki magazyniera w celu kompletacji towarów.
  * **Dokumentacja**: Automatyczne generowanie i drukowanie dowodów dostawy WZ, dokumentów przyjęcia PZ oraz międzynarodowych listów przewozowych CMR.

##### Filar 3: Automatyzacja Ubezpieczeń Ładunków i OCP (Automated Insurance)
* **Programowalne ubezpieczenia**:
  * Obliczanie składki i natychmiastowe wystawianie polis ubezpieczenia odpowiedzialności cywilnej przewoźnika (OCP) oraz ubezpieczenia ładunku (Cargo) bezpośrednio w trakcie składania zamówienia.
  * Ocena ryzyka online na podstawie właściwości ładunku, zadekralowanej wartości, trasy oraz rodzaju transportu.
* **Warstwa integracyjna**:
  * REST API Sandbox oraz bezpośrednie połączenia z wiodącymi brokerami i towarzystwami ubezpieczeniowymi w Polsce: **PZU**, **Warta**, **Ergo Hestia**.

##### Filar 4: Uzbrojona Eskorta i Szybkie Reagowanie (Armed Escort & Security)
* **Audyt bezpieczeństwa i eskorta**:
  * Mobilna funkcjonalność audytu obiektów i tras: identyfikacja słabych punktów, dokumentacja zdjęciowa, ocena poziomu ryzyka.
  * Zamawianie uzbrojonej eskorty mobilnej dla ładunków o wysokiej wartości na terytorium Polski i krajów UE.
  * Patrolowanie tras oraz parkingów dla ciężarówek.
* **Przycisk alarmowy SOS i Monitoring**:
  * Przycisk SOS / Panic Button w aplikacji mobilnej kierowcy z bezpośrednim przesyłaniem współrzędnych do Stacji Monitorowania Alarmów (SMA) oraz sygnałem do numeru alarmowego **112**.
  * Podłączenie telemetrii nadzoru wideo oraz czujników otwarcia przestrzeni ładunkowej.
* **System solidarności i premiowania kierowców (Driver Incentive System)**:
  * Program finansowego i materialnego nagradzania kierowców, którzy udzielają pomocy kolegom w sytuacjach zagrożenia lub awarii.
  * Mechanizmy motywacyjne: dodatkowe premie pieniężne, bony upominkowe, priorytetowy dostęp do zyskownych frachtów, certyfikaty na noclegi i posiłki, oficjalne listy pochwalne od kierownictwa.

---

#### 3. Stos Technologiczny i Architektura Chmurowa (GCP)

W celu zapewnienia wysokiej wydajności na urządzeniach klienckich o ograniczonych zasobach (4 GB RAM) całe obciążenie obliczeniowe zostało przeniesione do infrastruktury chmurowej Google Cloud Platform.

```
[Flutter Multi-Role Mobile Client]
   │
   ├─► [HTTPS/WSS] ──► [Google Cloud Run (Node.js/Go Microservices)]
   │                         │
   │                         ├─► [Cloud SQL (PostgreSQL + PostGIS)]
   │                         ├─► [Vertex AI / Gemini 1.5 Pro (Doc Recognition & OCR)]
   │                         └─► [External APIs: GUS, BLIK, PZU, Solid Security]
```

* **Infrastruktura chmurowa**: Google Cloud Platform (GCP).
* **Baza danych**: Cloud SQL dla PostgreSQL z rozszerzeniem **PostGIS** do szybkiego wykonywania zapytań przestrzennych (wyszukiwanie najbliższych magazynów, patroli i pojazdów).
* **Backend**: Architektura mikroserwisowa oparta na bezserwerowych kontenerach **Cloud Run** (Node.js / Go).
* **Sztuczna inteligencja i przetwarzanie dokumentów**: **Vertex AI (Gemini 1.5 Pro)** do automatycznego skanowania, rozpoznawania tekstu (OCR) oraz parsowania listów przewozowych CMR, dokumentów WZ, polis ubezpieczeniowych i danych NIP/REGON.
* **Aplikacja mobilna cross-platform**: **Flutter** (jedna baza kodu dla iOS i Android), obsługująca 4 role użytkowników:
  * *Zleceniodawca / Właściciel ładunku (Client / Cargo Owner)*
  * *Kierowca / Przewoźnik (Driver / Fleet Operator)*
  * *Menedżer magazynu (Warehouse Manager)*
  * *Dyspozytor ochrony (Security Officer / Dispatcher)*

---

#### 4. Macierz Ról i Scenariuszy Użytkowników

| Rola użytkownika | Kluczowy ekran (Figma) | Główne działania w aplikacji | Zintegrowany filar |
| :--- | :--- | :--- | :--- |
| **Zleceniodawca** | Wyszukiwarka frachtu i magazynów | Składanie zamówień, wybór ubezpieczenia, zamawianie ochrony, płatność BLIK | Filar 1, Filar 3, Filar 4 |
| **Kierowca** | Pulpit trasy & SOS | Nawigacja po trasie, odbiór ładunku, aktywacja przycisku SOS, odbieranie premii | Filar 1, Filar 4 |
| **Menedżer magazynu** | Mapa 2D Magazynu | Zarządzanie siatką miejsc paletowych 2D, skanowanie kodów QR, generowanie WZ/CMR | Filar 2 |
| **Dyspozytor ochrony** | Pulpit Monitoringu | Odbieranie sygnałów alarmowych (112 / SMA), dysponowanie załóg Solid/Securitas | Filar 4 |

---

#### 5. Harmonogram Wdrożenia (Roadmap)

* **Faza 1 (Bieżąca)**: Finalizacja dokumentu BRD na podstawie biznesplanu MPL INTERNATIONAL oraz przygotowanie repozytorium GitHub (master).
* **Faza 2**: Projektowanie schematu bazy danych PostgreSQL/PostGIS oraz specyfikacja REST/gRPC API.
* **Faza 3**: Stworzenie interaktywnego, klikalnego prototypu w Figma (ścieżka Happy Path: zakup frachtu, rezerwacja magazynu, wystawienie polisy i zamówienie ochrony) na potrzeby prezentacji dla inwestorów.
* **Faza 4**: Przygotowanie Pitch Deck, kompletacja dokumentacji (w tym pisma z Ministerstwa Rozwoju i Technologii) oraz złożenie wniosku do akceleratora **Google for Startups Campus Warsaw** i funduszy VC.

---
---

## CZĘŚĆ II: WERSJA ROSYJSKA (ПОЛНЫЙ ПЕРЕВОД / РУССКАЯ ВЕРСИЯ)

# Архитектура сетевой инфраструктуры, поисковой индексации и основная спецификация экосистемы B2B Logistics & Security Ecosystem (MPL INTERNATIONAL v2.0)

### Часть 1. Инфраструктурный контекст и сетевое связывание (Hetzner + nazwa.pl)

Интеграция сетевой инфраструктуры для направления целевого органического трафика из поисковых систем в закрытые экосистемы мессенджеров представляет собой сложную инженерную и SEO-задачу. Поисковый алгоритм Google не имеет технической возможности прямого сканирования, индексации и ранжирования внутренних интерфейсов диалоговых ботов Telegram, работающих на основе Telegram Bot API. Для преодоления этого ограничения требуется создание публичного промежуточного узла (landing page), выполняющего роль поискового якоря.

Связывание доменного имени `karta-pobytu-pomoc.pl`, зарегистрированного у польского регистратора `nazwa.pl`, с выделенным сервером Hetzner (IP-адрес: `46.224.198.66`) позволяет построить отказоустойчивую цепочку перенаправлений. Представленный архитектурный подход обеспечивает выполнение требований Google по скорости загрузки страниц, криптографической защите с использованием протокола HTTPS и корректной передаче контекста пользователя через механизмы глубокого связывания (Deep Linking).

#### Настройка зоны DNS в nazwa.pl

Управление авторитетной зоной DNS домена осуществляется через панель управления `nazwa.pl`. Для корректной привязки доменного имени к серверу Hetzner и обеспечения возможности выпуска защищенных SSL-сертификатов требуется точная настройка ресурсных записей.

| Имя хоста | Тип записи | Значение / Назначение | TTL (сек) | Инфраструктурная роль |
| :--- | :--- | :--- | :--- | :--- |
| `@ (karta-pobytu-pomoc.pl)` | SOA | `ns1.nazwa.pl biuro.nazwa.pl ...` | 3600 | Указание авторитетного сервера и параметров зоны |
| `@ (karta-pobytu-pomoc.pl)` | NS | `ns1.nazwa.pl, ns2.nazwa.pl, ns3.nazwa.pl` | 3600 | Делегирование обслуживания зоны DNS |
| `@ (karta-pobytu-pomoc.pl)` | A | `46.224.198.66` | 3600 | Привязка основного домена к IPv4-адресу Hetzner |
| `* (*.karta-pobytu-pomoc.pl)` | A | `46.224.198.66` | 3600 | Маршрутизация всех поддоменов (включая www) |
| `@ (karta-pobytu-pomoc.pl)` | CAA | `0 issue "letsencrypt.org"` | 3600 | Разрешение Let's Encrypt на выпуск сертификатов |
| `@ (karta-pobytu-pomoc.pl)` | CAA | `0 issuewild "letsencrypt.org"` | 3600 | Разрешение на выпуск Wildcard-сертификатов |
| `@ (karta-pobytu-pomoc.pl)` | TXT | `"v=spf1 mx a ~all"` | 3600 | Авторизация почтовых серверов и защита от спуфинга |
| `@ (karta-pobytu-pomoc.pl)` | TXT | `"google-site-verification=..."` | 3600 | Подтверждение прав собственности в Google Search Console |

---

### Часть 2. Основная спецификация и архитектура экосистемы B2B (MPL INTERNATIONAL v2.0)

#### 1. Регистрационные данные и инвестиционный статус

* **Название компании**: MPL INTERNATIONAL
* **Основатель / Founder**: Олег Зуевский (Oleg Zuiewski / Oleg Zujewski)
* **Дата обновления бизнес-плана**: 2026 год (базовый документ от 08.06.2024)
* **Институциональная валидация**: Официальное письмо поддержки от Министерства развития и технологий Польши и рассмотренная заявка в Польском агентстве развития предпринимательства (PARP).
* **Инвестиционная стратегия (Seed Round / Грант PARP)**:
  * Проект требует 25% собственного/привлеченного капитала (собственный вклад) для разблокировки 75–80% безвозвратного софинансирования от PARP (программы FENG / Ścieżka Smart).
  * Общий ориентировочный бюджет запуска и первого года деятельности: от 4 000 000 PLN до 12 000 000 PLN.
  * Цель MVP / Прототипа Figma: привлечение ангельских инвесторов на сумму 25% софинансирования (50 000 EUR – 100 000 EUR) под гарантию имеющейся государственной поддержки.

---

#### 2. Подробное описание 4 основных столпов (BRD)

##### Столп 1: Фрахт и транспортная агрегация (Freight & Freight Aggregation)
* **Оптимизация маршрутов и алгоритмы**:
  * Динамический расчет оптимальных маршрутов с учетом интенсивности движения, расхода топлива, массы груза и экологических показателей (углеродный след / CO2).
  * Обслуживание мультимодальных и интермодальных перевозок (автомобильный, железнодорожный, морской, авиационный транспорт).
  * Соответствие европейским стандартам и совместимость с общеевропейской платформой обмена логистической информацией AEOLIX (ER TICO).
* **Мониторинг и диспетчеризация**:
  * Отслеживание GPS-положения транспортных средств и статуса груза в режиме реального времени для водителя, диспетчера и получателя.
  * Система мгновенных Push-уведомлений о задержках, изменениях графика или непредвиденных обстоятельствах.
* **Интеграции**:
  * **GUS API (REGON/NIP)**: Автоматическая проверка польских контрагентов при регистрации.
  * **Платежные шлюзы BLIK / B2B**: Мгновенные платежи и преавторизация средств за фрахт.
  * **Google Maps / Mapbox API**: Создание геозон (geofencing) и грузовая навигация.

##### Столп 2: Управление складом и паллетоместами (WMS / Pallet Spaces)
* **2D-сетка и визуализация**:
  * Интерактивная 2D-визуализация стеллажных систем, уровней и свободных паллетомест на складе в режиме реального времени.
  * Монетизация избыточных площадей для 3PL-операторов через механизм мгновенного спотового бронирования.
* **Складские операции и автоматизация**:
  * **Приемка товара**: Регистрация грузов путем сканирования штрихкодов/QR-кодов камерой смартфона. Нативная фотофиксация повреждений при разгрузке.
  * **Адресное хранение**: Автоматическое указание стеллажа, полки и зоны для оптимального размещения.
  * **Комплектация заказов**: Построение оптимального маршрута кладовщика для сборки товаров.
  * **Документация**: Автоматическая генерация и печать накладных WZ, актов приемки PZ и международных транспортных накладных CMR.

##### Столп 3: Автоматизация страхования грузов и OCP (Automated Insurance)
* **Программируемое страхование**:
  * Расчет премии и мгновенный выпуск полисов страхования ответственности перевозчика (OCP) и страхования грузов (Cargo) непосредственно в процессе оформления заказа.
  * Онлайн-оценка рисков на основе характеристик груза, заявленной стоимости, маршрута и вида транспорта.
* **Интеграционный слой**:
  * REST API Sandbox и прямые подключения к ведущим брокерам и страховым компаниям Польши: **PZU**, **Warta**, **Ergo Hestia**.

##### Столп 4: Вооруженное сопровождение и быстрое реагирование (Armed Escort & Security)
* **Аудит безопасности и сопровождение**:
  * Мобильный функционал аудита объектов и маршрутов: выявление уязвимостей, фотодокументирование, оценка уровня риска.
  * Заказ мобильного вооруженного сопровождения для ценных грузов на территории Польши и стран ЕС.
  * Патрулирование маршрутов и стоянок для грузовых автомобилей.
* **Тревожная кнопка SOS и Мониторинг**:
  * Кнопка SOS / Panic Button в мобильном приложении водителя с прямой передачей координат на Станцию мониторинга тревог (SMA) и сигналом на номер экстренных служб **112**.
  * Подключение телеметрии видеонаблюдения и датчиков открытия грузового отсека.
* **Система солидарности и премирования водителей (Driver Incentive System)**:
  * Программа финансового и материального поощрения водителей, оказывающих помощь коллегам в опасных или аварийных ситуациях.
  * Мотивационные механизмы: дополнительные денежные премии, подарочные сертификаты, приоритетный доступ к прибыльным фрахтам, ваучеры на проживание и питание, официальные благодарственные письма от руководства.

---

#### 3. Технологический стек и облачная архитектура (GCP)

Для обеспечения высокой производительности на клиентских устройствах с ограниченными ресурсами (4 ГБ ОЗУ) вся вычислительная нагрузка перенесена в облачную инфраструктуру Google Cloud Platform.

```
[Flutter Multi-Role Mobile Client]
   │
   ├─► [HTTPS/WSS] ──► [Google Cloud Run (Node.js/Go Microservices)]
   │                         │
   │                         ├─► [Cloud SQL (PostgreSQL + PostGIS)]
   │                         ├─► [Vertex AI / Gemini 1.5 Pro (Doc Recognition & OCR)]
   │                         └─► [External APIs: GUS, BLIK, PZU, Solid Security]
```

* **Облачная инфраструктура**: Google Cloud Platform (GCP).
* **База данных**: Cloud SQL для PostgreSQL с расширением **PostGIS** для быстрого выполнения пространственных запросов (поиск ближайших складов, патрулей и транспортных средств).
* **Бэкенд**: Микросервисная архитектура на базе бессерверных контейнеров **Cloud Run** (Node.js / Go).
* **Искусственный интеллект и обработка документов**: **Vertex AI (Gemini 1.5 Pro)** для автоматического сканирования, распознавания текста (OCR) и парсинга накладных CMR, документов WZ, страховых полисов и данных NIP/REGON.
* **Кроссплатформенное мобильное приложение**: **Flutter** (единая кодовая база для iOS и Android), поддерживающее 4 пользовательские роли:
  * *Заказчик / Владелец груза (Client / Cargo Owner)*
  * *Водитель / Перевозчик (Driver / Fleet Operator)*
  * *Менеджер склада (Warehouse Manager)*
  * *Диспетчер охраны (Security Officer / Dispatcher)*

---

#### 4. Матрица ролей и пользовательских сценариев

| Роль пользователя | Ключевой экран (Figma) | Основные действия в приложении | Интегрированный столп |
| :--- | :--- | :--- | :--- |
| **Заказчик** | Поиск фрахта и складов | Оформление заказов, выбор страхования, заказ охраны, оплата BLIK | Столп 1, Столп 3, Столп 4 |
| **Водитель** | Панель маршрута & SOS | Навигация по маршруту, приемка груза, активация кнопки SOS, получение премий | Столп 1, Столп 4 |
| **Менеджер склада** | 2D-карта склада | Управление 2D-сеткой паллетомест, сканирование QR-кодов, генерация WZ/CMR | Столп 2 |
| **Диспетчер охраны** | Панель мониторинга | Прием тревожных сигналов (112 / SMA), направление экипажей Solid/Securitas | Столп 4 |

---

#### 5. График внедрения (Roadmap)

* **Фаза 1 (Текущая)**: Финализация документа BRD на основе бизнес-плана MPL INTERNATIONAL и подготовка репозитория GitHub (master).
* **Фаза 2**: Проектирование схемы базы данных PostgreSQL/PostGIS и спецификация REST/gRPC API.
* **Фаза 3**: Создание интерактивного кликабельного прототипа в Figma (сценарий Happy Path: покупка фрахта, бронирование склада, оформление полиса и заказ охраны) для презентации инвесторам.
* **Фаза 4**: Подготовка Pitch Deck, комплектация документации (включая письма от Министерства развития и технологий) и подача заявки в акселератор **Google for Startups Campus Warsaw** и венчурные фонды.
