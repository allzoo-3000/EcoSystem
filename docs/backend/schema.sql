-- MPL International B2B Ecosystem - PostgreSQL + PostGIS v1.0
-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. USERS (4 роли + NIP/REGON)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT CHECK (role IN ('cargo_owner','driver','warehouse_manager','security')),
  company_name TEXT NOT NULL,
  nip VARCHAR(10) UNIQUE,
  regon VARCHAR(14),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FREIGHT_ORDERS (A -> B)
CREATE TABLE freight_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  origin GEOGRAPHY(Point, 4326) NOT NULL,
  destination GEOGRAPHY(Point, 4326) NOT NULL,
  origin_label TEXT, -- "Warszawa, ul..."
  destination_label TEXT, -- "Wroclaw, ul..."
  status TEXT CHECK (status IN ('draft','published','in_transit','delivered','cancelled')) DEFAULT 'draft',
  price_pln DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_freight_origin ON freight_orders USING GIST (origin);
CREATE INDEX idx_freight_dest ON freight_orders USING GIST (destination);

-- 3. WAREHOUSES & PALLET_SPOTS (2D карта)
CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  location GEOGRAPHY(Point, 4326) NOT NULL,
  address TEXT
);
CREATE INDEX idx_warehouse_loc ON warehouses USING GIST (location);

CREATE TABLE pallet_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
  x INT NOT NULL, -- 2D координата по X
  y INT NOT NULL, -- 2D координата по Y
  status TEXT CHECK (status IN ('free','reserved','occupied')) DEFAULT 'free',
  freight_order_id UUID REFERENCES freight_orders(id),
  UNIQUE(warehouse_id, x, y)
);

-- 4. INSURANCE_POLICIES (PZU / Warta)
CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freight_order_id UUID REFERENCES freight_orders(id) ON DELETE CASCADE,
  provider TEXT CHECK (provider IN ('PZU','Warta','Allianz')) DEFAULT 'PZU',
  cargo_value_pln DECIMAL(12,2) NOT NULL,
  premium_pln DECIMAL(10,2) NOT NULL,
  policy_number TEXT UNIQUE,
  status TEXT CHECK (status IN ('calculated','paid','active','claim')) DEFAULT 'calculated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SECURITY_INCIDENTS (SOS + патрули)
CREATE TABLE security_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES users(id),
  freight_order_id UUID REFERENCES freight_orders(id),
  location GEOGRAPHY(Point, 4326) NOT NULL,
  type TEXT CHECK (type IN ('SOS','escort_request','theft_attempt')) DEFAULT 'SOS',
  status TEXT CHECK (status IN ('new','patrol_dispatched','resolved')) DEFAULT 'new',
  provider TEXT CHECK (provider IN ('Solid','Securitas','Impel')) DEFAULT 'Solid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_security_loc ON security_incidents USING GIST (location);

-- ПРИМЕР БЫСТРОГО ГЕО-ПОИСКА (PostGIS)
-- Найти 5 ближайших складов в радиусе 50км от точки грузовика:
-- SELECT id, name, ST_Distance(location, 'SRID=4326;POINT(21.0122 52.2297)'::geography)/1000 as km
-- FROM warehouses
-- WHERE ST_DWithin(location, 'SRID=4326;POINT(21.0122 52.2297)'::geography, 50000)
-- ORDER BY location <-> 'SRID=4326;POINT(21.0122 52.2297)'::geography LIMIT 5;
