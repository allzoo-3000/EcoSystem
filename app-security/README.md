# MPL OCHRONA — Licensed Security Network, Escort & 24/7 SOC

**Part of MPL Logistics Platform — Logistics OS for Europe**  
**Company:** MPL INTERNATIONAL SP. Z O.O. (NIP: 1133135478, Warsaw, Poland)  
**Target Environment:** React Native / Expo, Firebase, Google Cloud IoT  

---

## 1. Overview & Capabilities
MPL Ochrona connects over **467 licensed security firms across the European Union** (holding certified Ministry of Interior / MSWiA security licenses in Poland and equivalent EU credentials).
Key capabilities:
1. **Armed Tactical Escort Dispatch**: Real-time dispatch of armed security patrol vehicles to escort high-value freight (TAPA TSR-1 standards, electronics, pharmaceuticals, bonded alcohol/tobacco).
2. **IoT & PWA Corridor Geofencing**: Strict corridor bounding (±500m tolerance). Detects unexpected deviation and triggers CAN-bus electronic engine interlocks.
3. **24/7 SOC (Security Operations Center)**: Automated P1/P2/P3 incident escalation, continuous anti-jamming RF heartbeat, and instant panic button dispatch to Polish Police (Policja 112).
4. **Secured Class 4 / 5 Parking Reservation**: Real-time booking of fenced, thermal-monitored, 24/7 guarded truck stops with automated barrier access PINs.

---

## 2. Google Cloud Platform Architecture
- **Cloud Pub/Sub**: High-throughput message ingestion for vehicle sensor pings, tamper switches, and geofence events.
- **Cloud Run & Vertex AI**: Anomaly detection model analyzing speed deviations, night stops, and jamming interference signals.
- **Cloud Armor**: Enterprise-grade DDoS and WAF protection shielding the mission-critical SOC API endpoints from cyber threats.
- **Secret Manager**: Secure custody of encrypted electronic seal OTP tokens and vehicle ignition unlock keys.

---

## 3. Shared Shipment Data Contract
- Tied to `shipmentId: MPL-2026-EU-9481`.
- Receives GPS location continuously from **MPL Transport**.
- Provides security clearance and barrier entry PINs to **MPL Magazyny** buffer terminals.
- Feeds verified security protocols directly into **MPL Ubezpieczenia** to slash cargo insurance premiums by up to 45%.

---

## 4. Local Execution & Testing
```bash
cd app-security
npm install
npm run start # Launches Expo dev tools
```
Or open `index.html` in any web browser to test the interactive mobile web simulation.
