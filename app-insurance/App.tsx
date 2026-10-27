import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface InsuranceQuote {
  insurer: 'PZU' | 'WARTA' | 'ALLIANZ_PARTNERS';
  coverageType: string;
  limitEur: number;
  premiumEur: number;
  issuanceTimeSeconds: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'quote' | 'ocr' | 'policy' | 'claims'>('quote');
  const [selectedInsurer, setSelectedInsurer] = useState<'PZU' | 'WARTA' | 'ALLIANZ_PARTNERS'>('PZU');
  const [isBinding, setIsBinding] = useState(false);
  const [policyBound, setPolicyBound] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(true);

  const quotes: InsuranceQuote[] = [
    {
      insurer: 'PZU',
      coverageType: 'OCP Carrier Liability + All-Risk Cargo',
      limitEur: 300000,
      premiumEur: 145,
      issuanceTimeSeconds: 68,
    },
    {
      insurer: 'WARTA',
      coverageType: 'Full Comprehensive EU Transit + T1 Bond',
      limitEur: 300000,
      premiumEur: 152,
      issuanceTimeSeconds: 74,
    },
    {
      insurer: 'ALLIANZ_PARTNERS',
      coverageType: 'Cross-Border High-Value Electronics Shield',
      limitEur: 500000,
      premiumEur: 189,
      issuanceTimeSeconds: 88,
    },
  ];

  const handleBind90Sec = () => {
    setIsBinding(true);
    setTimeout(() => {
      setIsBinding(false);
      setPolicyBound(true);
      Alert.alert(
        'Policy Bound in 72 Seconds!',
        `Policy #POL-2026-PZU-9481 issued via API. Underwritten by PZU SA. Certificate attached to e-CMR in Firestore.`
      );
    }, 2000);
  };

  const handleTriggerOcr = () => {
    setOcrScanning(true);
    setTimeout(() => {
      setOcrScanning(false);
      setOcrCompleted(true);
      Alert.alert(
        'Google Document AI Analysis Complete',
        'Extracted from e-CMR: Cargo Value €184,500, Carrier NIP 1133135478, Vehicle Plate WI 8842P. 100% Match.'
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* App Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>MPL UBEZPIECZENIA</Text>
          <Text style={styles.brandSub}>90-Sec Instant Policy • PZU, Warta, Allianz</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SHP-9481</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'quote' && styles.tabButtonActive]}
          onPress={() => setActiveTab('quote')}>
          <Text style={[styles.tabText, activeTab === 'quote' && styles.tabTextActive]}>Instant Bind</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'ocr' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ocr')}>
          <Text style={[styles.tabText, activeTab === 'ocr' && styles.tabTextActive]}>Doc AI OCR</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'policy' && styles.tabButtonActive]}
          onPress={() => setActiveTab('policy')}>
          <Text style={[styles.tabText, activeTab === 'policy' && styles.tabTextActive]}>Active Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'claims' && styles.tabButtonActive]}
          onPress={() => setActiveTab('claims')}>
          <Text style={[styles.tabText, activeTab === 'claims' && styles.tabTextActive]}>FNOL Claim</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'quote' && (
          <View>
            <View style={styles.timerBanner}>
              <Text style={styles.timerTitle}>⏱️ Guaranteed Underwriting &lt; 90 Seconds</Text>
              <Text style={styles.timerSub}>Direct API underwriting linked to vehicle telemetry and TAPA security level</Text>
            </View>

            {quotes.map((q) => (
              <View 
                key={q.insurer} 
                style={[
                  styles.quoteCard, 
                  selectedInsurer === q.insurer && styles.quoteCardSelected
                ]}>
                <View style={styles.quoteCardHeader}>
                  <Text style={styles.insurerName}>{q.insurer}</Text>
                  <Text style={styles.premiumText}>€{q.premiumEur} <Text style={{ fontSize: 11, color: '#94a3b8' }}>/ voyage</Text></Text>
                </View>
                <Text style={styles.coverageText}>{q.coverageType}</Text>
                
                <View style={styles.specsRow}>
                  <Text style={styles.specItem}>Limit: €{q.limitEur.toLocaleString()}</Text>
                  <Text style={[styles.specItem, { color: '#10b981' }]}>Avg Bind: {q.issuanceTimeSeconds}s</Text>
                </View>

                <TouchableOpacity 
                  style={[styles.selectBtn, selectedInsurer === q.insurer && styles.selectBtnActive]}
                  onPress={() => setSelectedInsurer(q.insurer)}>
                  <Text style={styles.selectBtnText}>
                    {selectedInsurer === q.insurer ? '✓ Selected Underwriter' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity 
              style={styles.bindBigBtn}
              disabled={isBinding}
              onPress={handleBind90Sec}>
              {isBinding ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.bindBigBtnText}>⚡ Issue Instant Policy in 90 Seconds</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'ocr' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Google Document AI OCR Engine</Text>
            <Text style={styles.infoText}>Automatic parsing of e-CMR, invoices, and customs manifest.</Text>
            
            <View style={styles.ocrResultBox}>
              <Text style={styles.ocrHeader}>Extracted Key Entities (Confidence 99.4%):</Text>
              <Text style={styles.ocrRow}>• Consignor: Samsung Logistics Poland</Text>
              <Text style={styles.ocrRow}>• Carrier: MPL INTERNATIONAL SP. Z O.O.</Text>
              <Text style={styles.ocrRow}>• Tax ID: NIP 1133135478 (Warsaw, Poland)</Text>
              <Text style={styles.ocrRow}>• Declared Cargo Value: €184,500.00</Text>
              <Text style={styles.ocrRow}>• Commercial Seal: PL-KAS-09481-OK</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleTriggerOcr}>
              <Text style={styles.primaryButtonText}>
                {ocrScanning ? 'Scanning via Document AI...' : 'Scan New Document with Document AI'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'policy' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Active Policy Certificate</Text>
            <Text style={styles.infoText}>Policy Number: POL-2026-PZU-9481</Text>
            <Text style={styles.infoText}>Underwriter: PZU SA (Powszechny Zakład Ubezpieczeń)</Text>
            <Text style={styles.infoText}>Insured Entity: MPL INTERNATIONAL SP. Z O.O.</Text>
            <Text style={styles.infoText}>Coverage Scope: OCP Carrier + All-Risk Cargo Transit</Text>
            <Text style={styles.infoText}>Total Insured Sum: €300,000.00</Text>
            <Text style={styles.infoText}>Issuance Timestamp: Real-time API (72s duration)</Text>
            
            <View style={[styles.statusBox, { borderColor: '#10b981' }]}>
              <Text style={{ color: '#10b981', fontWeight: 'bold' }}>
                ✓ POLICY ACTIVE & BOUND TO SHIPMENT MPL-2026-EU-9481
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'claims' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Digital FNOL (First Notice of Loss)</Text>
            <Text style={styles.infoText}>Report cargo theft, roadside damage, or temperature deviation:</Text>
            
            <View style={styles.claimStepBox}>
              <Text style={styles.claimStepTitle}>1. Incident Telemetry Auto-Attach</Text>
              <Text style={styles.claimStepDesc}>GPS coordinates, SOC incident log, and driver photo are automatically attached to the claim dossier.</Text>
            </View>

            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: '#ef4444' }]}
              onPress={() => Alert.alert('Claim Dossier Initiated', 'PZU Claims Desk notified with telemetry bundle.')}>
              <Text style={styles.primaryButtonText}>Initiate Digital Claim</Text>
            </TouchableOpacity>
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
  tabText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  tabTextActive: { color: '#38bdf8', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  timerBanner: {
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  timerTitle: { color: '#38bdf8', fontSize: 13, fontWeight: 'bold' },
  timerSub: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  quoteCard: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  quoteCardSelected: { borderColor: '#0284c7', backgroundColor: 'rgba(2, 132, 199, 0.08)' },
  quoteCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  insurerName: { color: '#fff', fontSize: 16, fontWeight: '800' },
  premiumText: { color: '#fbbf24', fontSize: 16, fontWeight: '800' },
  coverageText: { color: '#cbd5e1', fontSize: 12, marginVertical: 6 },
  specsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  specItem: { color: '#94a3b8', fontSize: 11 },
  selectBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectBtnActive: { backgroundColor: '#0284c7' },
  selectBtnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  bindBigBtn: {
    backgroundColor: 'linear-gradient(135deg, #0284c7, #0369a1)',
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#0284c7',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  bindBigBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
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
  ocrResultBox: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  ocrHeader: { color: '#10b981', fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  ocrRow: { color: '#cbd5e1', fontSize: 11, lineHeight: 18, fontFamily: 'monospace' },
  primaryButton: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  statusBox: {
    backgroundColor: '#0a1322',
    padding: 12,
    borderRadius: 8,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  claimStepBox: {
    backgroundColor: '#020617',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
  },
  claimStepTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  claimStepDesc: { color: '#94a3b8', fontSize: 11, marginTop: 4, lineHeight: 16 },
});
