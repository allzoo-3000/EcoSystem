import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simulated Firebase Firestore connection to shared schema
interface UnifiedShipment {
  shipmentId: string;
  status: string;
  driverName: string;
  vehiclePlate: string;
  origin: string;
  destination: string;
  sentNumber: string;
  sentStatus: string;
  borderQueueHours: number;
  mlEtaPrediction: string;
  currentGps: { lat: number; lng: number; speed: number };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'tracking' | 'ecmr' | 'sent' | 'border'>('tracking');
  const [shipment, setShipment] = useState<UnifiedShipment>({
    shipmentId: 'MPL-2026-EU-9481',
    status: 'IN_TRANSIT',
    driverName: 'Marek Wiśniewski',
    vehiclePlate: 'WI 8842P',
    origin: 'Warsaw Hub (Panattoni West)',
    destination: 'Chełm Inland Terminal / Dorohusk',
    sentNumber: 'SENT2026/09481/PL',
    sentStatus: 'ACTIVE_MONITORING',
    borderQueueHours: 32,
    mlEtaPrediction: '18:45 Today (Vertex AI +22m buffer)',
    currentGps: { lat: 51.524, lng: 22.381, speed: 84 },
  });

  const [isSimulatingGps, setIsSimulatingGps] = useState(true);

  // Live GPS telemetry loop updating Firestore
  useEffect(() => {
    if (!isSimulatingGps) return;
    const interval = setInterval(() => {
      setShipment(prev => ({
        ...prev,
        currentGps: {
          lat: Number((prev.currentGps.lat + 0.0012).toFixed(4)),
          lng: Number((prev.currentGps.lng + 0.0018).toFixed(4)),
          speed: Math.floor(80 + Math.random() * 8),
        }
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulatingGps]);

  const handleSignEcmr = () => {
    Alert.alert('e-CMR Sign-off', 'Digital signature cryptographic hash generated and stored to Firestore Document Vault.');
  };

  const handleSentVerification = () => {
    Alert.alert('SENT Compliance Check', 'PUESC SENT-GEO Gateway responded: Status VALIDATED. Real-time GEO stream ACTIVE.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* App Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>MPL TRANSPORT</Text>
          <Text style={styles.brandSub}>Driver & Dispatch Terminal • {shipment.vehiclePlate}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ID: {shipment.shipmentId}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'tracking' && styles.tabButtonActive]}
          onPress={() => setActiveTab('tracking')}>
          <Text style={[styles.tabText, activeTab === 'tracking' && styles.tabTextActive]}>GPS Track</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'ecmr' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ecmr')}>
          <Text style={[styles.tabText, activeTab === 'ecmr' && styles.tabTextActive]}>e-CMR</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'sent' && styles.tabButtonActive]}
          onPress={() => setActiveTab('sent')}>
          <Text style={[styles.tabText, activeTab === 'sent' && styles.tabTextActive]}>SENT (PL)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'border' && styles.tabButtonActive]}
          onPress={() => setActiveTab('border')}>
          <Text style={[styles.tabText, activeTab === 'border' && styles.tabTextActive]}>Granica API</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'tracking' && (
          <View>
            <View style={styles.mapSimulatorCard}>
              <Text style={styles.mapTitle}>Google Maps Platform • Fleet Engine</Text>
              <View style={styles.mapMock}>
                <Text style={styles.mapPin}>🚚 {shipment.vehiclePlate} ({shipment.currentGps.speed} km/h)</Text>
                <Text style={styles.mapCoords}>
                  Lat: {shipment.currentGps.lat} • Lng: {shipment.currentGps.lng}
                </Text>
                <Text style={styles.mapRouteInfo}>Corridor: S12 Express Way → Dorohusk</Text>
              </View>
              <View style={styles.telemetryRow}>
                <View style={styles.telemetryBox}>
                  <Text style={styles.telemetryLabel}>Status</Text>
                  <Text style={styles.telemetryVal}>{shipment.status}</Text>
                </View>
                <View style={styles.telemetryBox}>
                  <Text style={styles.telemetryLabel}>Vertex AI ETA</Text>
                  <Text style={styles.telemetryVal}>18:45 Today</Text>
                </View>
                <View style={styles.telemetryBox}>
                  <Text style={styles.telemetryLabel}>Geofence</Text>
                  <Text style={[styles.telemetryVal, { color: '#10b981' }]}>LOCKED</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardHeader}>Dispatch Instructions</Text>
              <Text style={styles.infoText}>• Driver: {shipment.driverName}</Text>
              <Text style={styles.infoText}>• Pick-up: {shipment.origin}</Text>
              <Text style={styles.infoText}>• Drop-off: {shipment.destination}</Text>
              <Text style={styles.infoText}>• Buffer Hub: Pre-booked at Panattoni Chełm (Slot B-14)</Text>
            </View>
          </View>
        )}

        {activeTab === 'ecmr' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Electronic Consignment Note (e-CMR)</Text>
            <Text style={styles.infoText}>Document ID: CMR-PL-2026-9481-EXT</Text>
            <Text style={styles.infoText}>Standard: UN/CEFACT & EU eFTI Compliant</Text>
            <Text style={styles.infoText}>Carrier: MPL INTERNATIONAL SP. Z O.O. (NIP 1133135478)</Text>
            <Text style={styles.infoText}>Cargo: 33 Euro Pallets • High-Value Industrial Electronics</Text>
            <Text style={styles.infoText}>Declared Value: €184,500.00</Text>
            
            <View style={styles.signatureStatusBox}>
              <Text style={styles.sigStatusText}>✓ Shipper Digital Signature: CONFIRMED</Text>
              <Text style={styles.sigStatusText}>✓ Carrier Driver Signature: CONFIRMED</Text>
              <Text style={styles.sigStatusText}>⏳ Consignee Delivery Signature: PENDING ARRIVAL</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignEcmr}>
              <Text style={styles.primaryButtonText}>Verify & Re-Sign e-CMR</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'sent' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>SENT Poland Registry Compliance</Text>
            <Text style={styles.infoText}>Regulatory Authority: Krajowa Administracja Skarbowa (KAS)</Text>
            <Text style={styles.infoText}>Reference Number: {shipment.sentNumber}</Text>
            <Text style={styles.infoText}>SENT Status: {shipment.sentStatus}</Text>
            <Text style={styles.infoText}>GPS Geolocation Device: MPL Native IoT / PWA Transponder</Text>
            
            <View style={[styles.signatureStatusBox, { borderColor: '#10b981' }]}>
              <Text style={[styles.sigStatusText, { color: '#10b981' }]}>
                ● SENT-GEO Active: Transmitting coordinates to PUESC every 15s.
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSentVerification}>
              <Text style={styles.primaryButtonText}>Check KAS PUESC Sync</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'border' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Granica.gov.pl Live Wait Times</Text>
            <Text style={styles.infoText}>Real-time border queue telemetry for EU external customs:</Text>
            
            <View style={styles.queueItem}>
              <Text style={styles.queueName}>Dorohusk - Jagodzin (Target)</Text>
              <Text style={styles.queueHours}>{shipment.borderQueueHours}h wait</Text>
            </View>
            <View style={styles.queueItem}>
              <Text style={styles.queueName}>Korczowa - Krakowiec</Text>
              <Text style={styles.queueHours}>18h wait</Text>
            </View>
            <View style={styles.queueItem}>
              <Text style={styles.queueName}>Hrebenne - Rawa Ruska</Text>
              <Text style={styles.queueHours}>24h wait</Text>
            </View>
            <View style={styles.queueItem}>
              <Text style={styles.queueName}>Medyka - Szeginie</Text>
              <Text style={styles.queueHours}>12h wait</Text>
            </View>

            <View style={styles.recommendationBox}>
              <Text style={styles.recTitle}>AI Optimization Recommendation:</Text>
              <Text style={styles.recDesc}>
                Dorohusk queue exceeds 24h. Buffer drop recommended at Hub 2 (Panattoni Chełm) to prevent Euro 6 truck idle cost.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070d17' },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#0a1322',
  },
  brandTitle: { color: '#38bdf8', fontSize: 18, fontWeight: 'bold' },
  brandSub: { color: '#94a3b8', fontSize: 11 },
  badge: { backgroundColor: '#1e293b', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#f8fafc', fontSize: 12, fontWeight: 'bold' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabButtonActive: { borderBottomWidth: 2, borderBottomColor: '#0284c7' },
  tabText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#38bdf8', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  mapSimulatorCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    marginBottom: 16,
  },
  mapTitle: { color: '#f8fafc', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  mapMock: {
    backgroundColor: '#070d17',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  mapPin: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  mapCoords: { color: '#94a3b8', fontSize: 11, fontFamily: 'monospace' },
  mapRouteInfo: { color: '#10b981', fontSize: 12, marginTop: 8, fontWeight: '600' },
  telemetryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  telemetryBox: { flex: 1, alignItems: 'center' },
  telemetryLabel: { color: '#64748b', fontSize: 10, textTransform: 'uppercase' },
  telemetryVal: { color: '#f8fafc', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  infoCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: { color: '#f8fafc', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  infoText: { color: '#cbd5e1', fontSize: 13, lineHeight: 22 },
  signatureStatusBox: {
    backgroundColor: '#0a1322',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginVertical: 14,
  },
  sigStatusText: { color: '#38bdf8', fontSize: 12, marginVertical: 2 },
  primaryButton: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  queueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  queueName: { color: '#f8fafc', fontSize: 13 },
  queueHours: { color: '#fbbf24', fontSize: 13, fontWeight: 'bold' },
  recommendationBox: {
    marginTop: 16,
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    padding: 12,
    borderRadius: 4,
  },
  recTitle: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  recDesc: { color: '#94a3b8', fontSize: 12, marginTop: 4, lineHeight: 18 },
});
