# MPL TRANSPORT — Driver & Dispatch Mobile Application

**Part of MPL Logistics Platform — Logistics OS for Europe**  
**Company:** MPL INTERNATIONAL SP. Z O.O. (NIP: 1133135478, Warsaw, Poland)  
**Target Environment:** React Native / Expo, Firebase, Google Maps Platform  

---

## 1. Overview & Capabilities
MPL Transport provides cross-border truck drivers and dispatchers with a mission-critical mobile terminal ensuring:
1. **Real-time Truck Location Tracking**: Integrates Google Maps Platform Routes API and Fleet Engine with high-frequency GPS pinging.
2. **e-CMR Document Creation & Tracking**: End-to-end digital consignment note compliant with EU eFTI regulations and UN/CEFACT standards. Generates cryptographically verifiable inspection QR codes for customs.
3. **SENT Compliance Poland**: Automated integration with the Ministry of Finance PUESC / Krajowa Administracja Skarbowa (KAS) gateway for real-time SENT-GEO geolocation tracking.
4. **Vertex AI Predictive ETA**: Machine learning engine computing traffic, mandatory driver rest intervals, and border congestion delays.
5. **Granica.gov.pl Live API Ticker**: Real-time wait time monitoring across major Polish-Ukrainian and EU eastern external borders (Dorohusk, Korczowa, Hrebenne, Medyka).

---

## 2. Google Cloud Platform Architecture
- **Firebase Auth**: Multi-factor driver authentication with phone number verification and driver card tokens.
- **Cloud Firestore**: Real-time synchronization of vehicle telemetry, e-CMR signatures, and geofence alerts under `shipments/{shipmentId}`.
- **Google Maps Platform**:
  - `Routes API` for preferred commercial vehicle heavy truck routing (avoiding low bridges and weight restrictions).
  - `Navigation SDK` for turn-by-turn guidance.
- **Vertex AI**: Real-time arrival time prediction accounting for border queuing anomalies.

---

## 3. Shared Shipment Data Contract
MPL Transport shares state with the other 3 apps via `shipmentId`:
- Triggers automated buffer slot booking in **MPL Magazyny** when border delay exceeds 12 hours.
- Streams live coordinates to **MPL Ochrona** for geofence corridor monitoring and armed escort coordination.
- Supplies verified e-CMR cargo details to **MPL Ubezpieczenia** for instant 90-second policy underwriting.

---

## 4. Local Execution & Testing
```bash
cd app-transport
npm install
npm run start # Launches Expo dev tools
```
Or open `index.html` in any web browser to test the interactive mobile web simulation.
