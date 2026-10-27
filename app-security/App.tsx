import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface SecurityStatus {
  shipmentId: string;
  securityLevel: string;
  escortDispatched: boolean;
  licensedFirmName: string;
  guardsCount: number;
  corridorDeviationMeters: number;
  hardwareLockEngaged: boolean;
  socAlertLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  securedParkingBooked: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'soc' | 'escort' | 'geofence' | 'parking'>('soc');
  const [security, setSecurity] = useState<SecurityStatus>({
    shipmentId: 'MPL-2026-EU-9481',
    securityLevel: 'HIGH_VALUE_TSR1',
    escortDispatched: true,
    licensedFirmName: 'Konsalnet Security Poland (MSWiA #1482)',
    guardsCount: 2,
    corridorDeviationMeters: 14,
    hardwareLockEngaged: true,
    socAlertLevel: 'NORMAL',
    securedParkingBooked: true,
  });

  const handlePanicButton = () => {
    setSecurity(prev => ({ ...prev, socAlertLevel: 'CRITICAL' }));
    Alert.alert(
      'EMERGENCY PANIC ACTIVATED',
      'P1 Priority SOS dispatched to Warsaw 24/7 SOC Control Tower and Polish Police (Policja 112). Engine CAN-bus lockdown triggered.',
      [{ text: 'Acknowledge' }]
    );
  };

  const handleDispatchEscort = () => {
    Alert.alert(
      'Dispatch Armed Escort Unit',
      'Requesting nearest tactical vehicle from 467 licensed security firms network...',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Tactical Escort', 
          onPress: () => {
            setSecurity(prev => ({ ...prev, escortDispatched: true }));
            Alert.alert('Unit Dispatched', 'Patrol Vehicle POL-SEC-91 assigned (ETA 12 mins).');
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
          <Text style={styles.brandTitle}>MPL OCHRONA</Text>
          <Text style={styles.brandSub}>467 Licensed Security Firms • 24/7 SOC</Text>
        </View>
        <View style={[styles.badge, security.socAlertLevel === 'CRITICAL' && { backgroundColor: '#ef4444' }]}>
          <Text style={styles.badgeText}>SOC: {security.socAlertLevel}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'soc' && styles.tabButtonActive]}
          onPress={() => setActiveTab('soc')}>
          <Text style={[styles.tabText, activeTab === 'soc' && styles.tabTextActive]}>SOC Tower</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'escort' && styles.tabButtonActive]}
          onPress={() => setActiveTab('escort')}>
          <Text style={[styles.tabText, activeTab === 'escort' && styles.tabTextActive]}>Armed Escort</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'geofence' && styles.tabButtonActive]}
          onPress={() => setActiveTab('geofence')}>
          <Text style={[styles.tabText, activeTab === 'geofence' && styles.tabTextActive]}>IoT Geofence</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'parking' && styles.tabButtonActive]}
          onPress={() => setActiveTab('parking')}>
          <Text style={[styles.tabText, activeTab === 'parking' && styles.tabTextActive]}>Class 4/5 Parking</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'soc' && (
          <View>
            <View style={styles.infoCard}>
              <Text style={styles.cardHeader}>24/7 Security Operations Center</Text>
              <Text style={styles.infoText}>Shipment Ref: {security.shipmentId}</Text>
              <Text style={styles.infoText}>Assigned Firm: {security.licensedFirmName}</Text>
              <Text style={styles.infoText}>Security Tier: {security.securityLevel}</Text>
              <Text style={styles.infoText}>Electronic Kingpin Lock: {security.hardwareLockEngaged ? 'ENGAGED' : 'UNLOCKED'}</Text>
              
              <View style={styles.statusBox}>
                <Text style={{ color: '#10b981', fontWeight: 'bold' }}>
                  ● SOC STATUS: MONITORED VIA GOOGLE CLOUD IOT
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>
                  Heartbeat every 10 seconds. Anti-jamming RF watchdog active.
                </Text>
              </View>
            </View>

            {/* Panic SOS Button */}
            <TouchableOpacity style={styles.panicButton} onPress={handlePanicButton}>
              <Text style={styles.panicButtonText}>🚨 PANIC BUTTON / SOS DISPATCH</Text>
              <Text style={styles.panicButtonSub}>Instantly notifies 24/7 SOC & Polish Police</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'escort' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Armed Tactical Escort Network</Text>
            <Text style={styles.infoText}>Coverage: 467 Licensed Security Agencies across EU</Text>
            <Text style={styles.infoText}>Unit Status: {security.escortDispatched ? 'ACTIVE ESCORT PATROL' : 'STANDBY'}</Text>
            <Text style={styles.infoText}>Guards on Unit: {security.guardsCount} Armed Licensed Operatives</Text>
            <Text style={styles.infoText}>Escort Call Sign: TACTICAL-ALPHA-2</Text>
            
            <TouchableOpacity style={styles.primaryButton} onPress={handleDispatchEscort}>
              <Text style={styles.primaryButtonText}>Request Additional Tactical Escort</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'geofence' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>IoT Corridor & Anti-Theft Geofence</Text>
            <Text style={styles.infoText}>Allowed Corridor Width: ±500 meters</Text>
            <Text style={styles.infoText}>Current Deviation: {security.corridorDeviationMeters} meters (NOMINAL)</Text>
            <Text style={styles.infoText}>Anti-Jamming GSM/GPS Sensor: ACTIVE</Text>
            <Text style={styles.infoText}>Cargo Door Sensor: CLOSED & CRYPTO-SEALED</Text>
            
            <View style={[styles.statusBox, { borderColor: '#10b981' }]}>
              <Text style={{ color: '#10b981', fontWeight: 'bold' }}>
                ✓ NO CORRIDOR BREACH DETECTED
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'parking' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeader}>Secured Parking (Class 4 / 5)</Text>
            <Text style={styles.infoText}>Standard: TAPA TSR-1 / ESPA Gold Security Parking</Text>
            <Text style={styles.infoText}>Reserved Site: Chełm Secure Perimeter Park #02</Text>
            <Text style={styles.infoText}>Infrared Fence & 4K CCTV: FULL COVERAGE</Text>
            <Text style={styles.infoText}>Driver Rest Mode: ACTIVATED (Sleep Guard Enabled)</Text>
            
            <View style={styles.pinBox}>
              <Text style={{ color: '#94a3b8', fontSize: 11 }}>GATE BARRIER ACCESS PIN</Text>
              <Text style={{ color: '#fbbf24', fontSize: 18, fontWeight: 'bold' }}># 9 4 8 1 *</Text>
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
  tabText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  tabTextActive: { color: '#38bdf8', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
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
  panicButton: {
    backgroundColor: '#ef4444',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 8,
  },
  panicButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  panicButtonSub: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4 },
  primaryButton: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  pinBox: {
    backgroundColor: '#020617',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
});
