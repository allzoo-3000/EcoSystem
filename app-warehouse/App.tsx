import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface WarehouseHub {
  id: string;
  name: string;
  operator: 'Panattoni' | 'Segro' | 'Logicor' | 'Independent';
  city: string;
  availableBufferSlots: number;
  ratePerPalletHourEur: number;
  tapaClass: string;
  wmsSync: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'mybookings' | 'wms' | 'vault'>('marketplace');
  const [selectedHub, setSelectedHub] = useState<WarehouseHub | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const hubs: WarehouseHub[] = [
    {
      id: 'HUB-PL-048',
      name: 'Chełm Inland Buffer Terminal',
      operator: 'Independent',
      city: 'Chełm (DK12 near Dorohusk)',
      availableBufferSlots: 142,
      ratePerPalletHourEur: 0.85,
      tapaClass: 'TAPA TSR-1',
      wmsSync: 'REST / EDI OK',
    },
    {
      id: 'HUB-PL-012',
      name: 'Panattoni Park Warsaw West',
      operator: 'Panattoni',
      city: 'Warsaw / Ożarów Maz.',
      availableBufferSlots: 320,
      ratePerPalletHourEur: 1.10,
      tapaClass: 'TAPA TSR-1',
      wmsSync: 'SAP EWM API Direct',
    },
    {
      id: 'HUB-PL-027',
      name: 'Segro Logistics Park Stryków',
      operator: 'Segro',
      city: 'Łódź / Stryków (A1/A2 junction)',
      availableBufferSlots: 210,
      ratePerPalletHourEur: 0.95,
      tapaClass: 'ESPA Gold',
      wmsSync: 'Manhattan WMS OK',
    },
    {
      id: 'HUB-PL-039',
      name: 'Logicor Poznań Logistic Centre',
      operator: 'Logicor',
      city: 'Poznań (A2 Highway)',
      availableBufferSlots: 185,
      ratePerPalletHourEur: 0.90,
      tapaClass: 'TAPA TSR-2',
      wmsSync: 'Infor WMS Direct',
    },
  ];

  const handleInstantBooking = (hub: WarehouseHub) => {
    setSelectedHub(hub);
    Alert.alert(
      'Confirm Buffer Reservation',
      `Reserve 33 Euro Pallets at ${hub.name} for Shipment MPL-2026-EU-9481?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Instant Booking', 
          onPress: () => {
            setBookingConfirmed(true);
            Alert.alert('Slot Reserved', `Buffer slot allocated: Bay B-14. WMS EDI dispatch sent.`);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* App Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>MPL MAGAZYNY</Text>
          <Text style={styles.brandSub}>2,134+ EU Buffer Hubs • Instant WMS Booking</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SHP-9481</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'marketplace' && styles.tabButtonActive]}
          onPress={() => setActiveTab('marketplace')}>
          <Text style={[styles.tabText, activeTab === 'marketplace' && styles.tabTextActive]}>Marketplace</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'mybookings' && styles.tabButtonActive]}
          onPress={() => setActiveTab('mybookings')}>
          <Text style={[styles.tabText, activeTab === 'mybookings' && styles.tabTextActive]}>Active Buffer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'wms' && styles.tabButtonActive]}
          onPress={() => setActiveTab('wms')}>
          <Text style={[styles.tabText, activeTab === 'wms' && styles.tabTextActive]}>WMS EDI</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'vault' && styles.tabButtonActive]}
          onPress={() => setActiveTab('vault')}>
          <Text style={[styles.tabText, activeTab === 'vault' && styles.tabTextActive]}>Doc Vault</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'marketplace' && (
          <View>
            <View style={styles.searchBanner}>
              <Text style={styles.searchBannerTitle}>Search 2,134+ Verified Logistics Hubs</Text>
              <Text style={styles.searchBannerSub}>Instant drop-and-hook and buffer cross-docking along European freight corridors</Text>
            </View>

            {hubs.map((hub) => (
              <View key={hub.id} style={styles.hubCard}>
                <View style={styles.hubCardHeader}>
                  <Text style={styles.hubName}>{hub.name}</Text>
                  <Text style={styles.operatorBadge}>{hub.operator}</Text>
                </View>
                <Text style={styles.hubCity}>📍 {hub.city}</Text>
                
                <View style={styles.hubMetricsRow}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Free Slots</Text>
                    <Text style={styles.metricVal}>{hub.availableBufferSlots} plts</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Security</Text>
                    <Text style={[styles.metricVal, { color: '#10b981' }]}>{hub.tapaClass}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Rate / Plt</Text>
                    <Text style={styles.metricVal}>€{hub.ratePerPalletHourEur}/hr</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => handleInstantBooking(hub)}>
                  <Text style={styles.bookButtonText}>⚡ Instant 1-Click Buffer Booking</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'mybookings' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Current Buffer Reservation</Text>
            <Text style={styles.infoText}>Associated Shipment: MPL-2026-EU-9481</Text>
            <Text style={styles.infoText}>Reserved Hub: Chełm Inland Terminal</Text>
            <Text style={styles.infoText}>Allocated Dock: Bay B-14 (Ramp Fast-Track)</Text>
            <Text style={styles.infoText}>Cargo Buffer Duration: 24h Anticipated (Dorohusk Queue)</Text>
            <Text style={styles.infoText}>Security Perimeter: 24/7 Monitored CCTV + Electronic Kingpin Lock</Text>
            
            <View style={styles.statusBox}>
              <Text style={{ color: '#10b981', fontWeight: 'bold' }}>
                ● STATUS: CONFIRMED & READY FOR TRUCK ARRIVAL
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'wms' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>WMS Integration Pipeline</Text>
            <Text style={styles.infoText}>Standard: EDIFACT INVRPT / DESADV & REST Webhooks</Text>
            <Text style={styles.infoText}>Synced Hub: Panattoni West (SAP EWM Connector #91)</Text>
            <Text style={styles.infoText}>Cross-Dock Latency: &lt;1.2 seconds</Text>
            
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>
                {`POST /api/v1/wms/buffer/reserve\n{\n  "shipmentId": "MPL-2026-EU-9481",\n  "pallets": 33,\n  "handling": "CROSSDOCK_BUFFER",\n  "priority": "HIGH_VALUE"\n}\n--> 200 OK: Slot Reserved`}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'vault' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Warehouse Document Vault (CMR, VAT, T1)</Text>
            <Text style={styles.infoText}>Encrypted Google Cloud Storage Bucket: gs://mpl-warehouse-vault/</Text>
            
            <View style={styles.docItem}>
              <Text style={styles.docTitle}>📄 e-CMR-9481-Shipper.pdf (UN/CEFACT)</Text>
              <Text style={styles.docStatus}>Verified by Document AI</Text>
            </View>
            <View style={styles.docItem}>
              <Text style={styles.docTitle}>📄 VAT_Invoice_MPL_PL1133135478.pdf</Text>
              <Text style={styles.docStatus}>Parsed & Validated</Text>
            </View>
            <View style={styles.docItem}>
              <Text style={styles.docTitle}>📄 EU_Customs_T1_Transit_Bond.pdf</Text>
              <Text style={styles.docStatus}>Ready for Dorohusk Border</Text>
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
  searchBanner: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 16,
  },
  searchBannerTitle: { color: '#f8fafc', fontSize: 14, fontWeight: 'bold' },
  searchBannerSub: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  hubCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    marginBottom: 14,
  },
  hubCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hubName: { color: '#f8fafc', fontSize: 15, fontWeight: 'bold' },
  operatorBadge: {
    backgroundColor: 'rgba(2, 132, 199, 0.2)',
    color: '#38bdf8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
  },
  hubCity: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  hubMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  metricItem: { flex: 1, alignItems: 'center' },
  metricLabel: { color: '#64748b', fontSize: 10, textTransform: 'uppercase' },
  metricVal: { color: '#f8fafc', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  bookButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
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
  statusBox: {
    backgroundColor: '#0a1322',
    padding: 12,
    borderRadius: 8,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  codeBox: {
    backgroundColor: '#020617',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  codeText: { color: '#38bdf8', fontFamily: 'monospace', fontSize: 11, lineHeight: 18 },
  docItem: {
    backgroundColor: '#0a1322',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  docTitle: { color: '#f8fafc', fontSize: 13, fontWeight: '600' },
  docStatus: { color: '#10b981', fontSize: 11, marginTop: 2 },
});
