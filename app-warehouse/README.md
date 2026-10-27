# MPL MAGAZYNY — Buffer Warehouse Network & WMS Integration

**Part of MPL Logistics Platform — Logistics OS for Europe**  
**Company:** MPL INTERNATIONAL SP. Z O.O. (NIP: 1133135478, Warsaw, Poland)  
**Target Environment:** React Native / Expo, Firebase, Google Cloud Run  

---

## 1. Overview & Capabilities
MPL Magazyny aggregates a Pan-European network of over **2,134+ buffer warehouses** (including Panattoni, Segro, Logicor, and certified independent logistics terminals).
Key capabilities:
1. **Instant Booking Marketplace**: 1-click on-demand reservation of buffer pallet slots along European transport corridors.
2. **Buffer Drop-and-Hook**: Enables trailers to be decoupled and stored in secured TAPA TSR Level 1 facilities when border queues exceed acceptable thresholds, freeing Euro 6 tractors for continuous rotation.
3. **Enterprise WMS Integration**: Live bi-directional integration with SAP EWM, Manhattan Associates, Infor, and native EDIFACT (DESADV / INVRPT) / REST APIs.
4. **Secure Document Vault**: Automated ingestion and storage of e-CMRs, VAT invoices, customs T1 declarations, and physical seal certificates.

---

## 2. Google Cloud Platform Architecture
- **Cloud Run**: Microservice orchestrating availability feeds and instant reservation state machines.
- **Cloud Firestore**: Real-time inventory sync between warehouse gate terminals and driver mobile apps.
- **Google Cloud Storage (GCS)**: Multi-region encrypted storage for high-resolution cargo inspection photos and signed customs papers.
- **Document AI**: Automatic classification and OCR entity extraction for incoming warehouse paperwork.

---

## 3. Shared Shipment Data Contract
- Uses master `shipmentId: MPL-2026-EU-9481`.
- When border delays are detected in **MPL Transport**, the system automatically suggests the closest pre-cleared buffer warehouse.
- Handover tokens and warehouse gate entry PINs sync directly with **MPL Ochrona** for perimeter security clearance.
- Receipt of goods triggers automated transit insurance warranty fulfillment in **MPL Ubezpieczenia**.

---

## 4. Local Execution & Testing
```bash
cd app-warehouse
npm install
npm run start # Launches Expo dev tools
```
Or open `index.html` in any web browser to test the interactive mobile web simulation.
