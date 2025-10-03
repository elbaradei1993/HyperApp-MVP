import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileReports = () => {
  const [userStats] = useState({
    reportsSubmitted: 15,
    alertsReceived: 3,
    safetyScore: 85,
  });

  const [reportHistory] = useState([
    { id: '1', type: 'Safe', location: 'Park', date: '2023-10-01' },
    { id: '2', type: 'Crowded', location: 'Mall', date: '2023-09-28' },
    { id: '3', type: 'Suspicious', location: 'Street', date: '2023-09-25' },
  ]);

  const handleSettings = () => {
    // Navigate to settings
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={80} color="#007AFF" />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userStats.reportsSubmitted}</Text>
          <Text style={styles.statLabel}>Reports</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userStats.alertsReceived}</Text>
          <Text style={styles.statLabel}>Alerts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userStats.safetyScore}%</Text>
          <Text style={styles.statLabel}>Safety Score</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report History</Text>
        <FlatList
          data={reportHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <View style={styles.reportIcon}>
                <Ionicons
                  name={
                    item.type === 'Safe' ? 'checkmark-circle' :
                    item.type === 'Crowded' ? 'people' :
                    item.type === 'Suspicious' ? 'eye' : 'warning'
                  }
                  size={24}
                  color={
                    item.type === 'Safe' ? 'green' :
                    item.type === 'Crowded' ? 'orange' :
                    item.type === 'Suspicious' ? 'yellow' : 'red'
                  }
                />
              </View>
              <View style={styles.reportDetails}>
                <Text style={styles.reportType}>{item.type}</Text>
                <Text style={styles.reportLocation}>{item.location}</Text>
                <Text style={styles.reportDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
        <Ionicons name="settings" size={24} color="white" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileHeader: { alignItems: 'center', padding: 20, backgroundColor: 'white' },
  userName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  userEmail: { fontSize: 16, color: '#666' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: 'white', marginTop: 10 },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#007AFF' },
  statLabel: { fontSize: 14, color: '#666' },
  section: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  reportItem: { flexDirection: 'row', backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8 },
  reportIcon: { marginRight: 15, justifyContent: 'center' },
  reportDetails: { flex: 1 },
  reportType: { fontSize: 16, fontWeight: 'bold' },
  reportLocation: { fontSize: 14, color: '#666' },
  reportDate: { fontSize: 12, color: '#999' },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  settingsText: { color: 'white', fontSize: 16, marginLeft: 10 },
});

export default ProfileReports;
