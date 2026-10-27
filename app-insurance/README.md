# MPL UBEZPIECZENIA — 90-Second Cargo & OCP Insurance

**Part of MPL Logistics Platform — Logistics OS for Europe**  
**Company:** MPL INTERNATIONAL SP. Z O.O. (NIP: 1133135478, Warsaw, Poland)  
**Target Environment:** React Native / Expo, Firebase, Google Document AI  
**GitHub Pages Target Branch:** `app-insurance` on `allzoo-3000/EcoSystem`  

---

## 1. Overview & Capabilities
MPL Ubezpieczenia transforms traditional slow multi-day transport insurance underwriting into an automated **90-second digital bind** process.
Key capabilities:
1. **Multi-Carrier Live Underwriting API**: Direct algorithmic policy binding with leading Polish and European insurers:
   - **PZU SA** (Powszechny Zakład Ubezpieczeń)
   - **TUiR Warta**
   - **Allianz Partners**
2. **Instant 90-Second Policy Issuance**: Algorithmic risk pricing factoring in vehicle telemetry, driver license history, TAPA TSR-1 parking compliance, and armed escort presence (unlocking up to 45% premium reductions).
3. **Google Document AI OCR Processing**: Real-time extraction of consignment notes (e-CMR), bill of lading, vehicle registration numbers, and declared commercial cargo value.
4. **End-to-End Digital Claims (FNOL)**: Instant first notice of loss with pre-bundled GPS logs, tamper timestamps from **MPL Ochrona**, and e-CMR proof of damage.

---

## 2. Google Cloud Platform Architecture
- **Document AI**: Custom trained OCR processor extracting structured entities (`carrierNip`, `cargoValueEur`, `shipperName`, `consigneeName`, `sealNumber`).
- **Cloud Run**: Serverless gateway communicating with PZU / Warta REST underwriting APIs with TLS mutual authentication.
- **Secret Manager**: Secure custody of production API tokens and HMAC signing keys for insurer webhooks.
- **Cloud Firestore**: Instant policy synchronization across all 4 ecosystem apps.

---

## 3. Shared Shipment Data Contract
- Bound directly to `shipmentId: MPL-2026-EU-9481`.
- Cargo declarations from **MPL Transport** automatically generate policy risk tiers.
- High-value alerts require active confirmation from **MPL Ochrona** prior to policy underwriting.
- Storage receipts from **MPL Magazyny** provide insured warehouse buffer coverage during border wait periods.

---

## 4. Local Execution & Testing
```bash
cd app-insurance
npm install
npm run start # Launches Expo dev tools
```
Or open `index.html` in any web browser to test the interactive mobile web simulation.
