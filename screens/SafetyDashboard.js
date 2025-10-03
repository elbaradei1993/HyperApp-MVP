import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Conditionally import map components
let MapView, Heatmap;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Heatmap = Maps.Heatmap;
}
import * as Location from 'expo-location';

const SafetyDashboard = () => {
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([
    { id: '1', type: 'Safe', location: 'Downtown', timestamp: '10:30 AM' },
    { id: '2', type: 'Crowded', location: 'Mall', timestamp: '9:15 AM' },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required for safety features.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleQuickReport = (type) => {
    Alert.alert('Report Submitted', `Reported as ${type}`);
    // Add to Firestore here
  };

  const handleSOS = () => {
    Alert.alert('SOS Activated', 'Emergency services notified. Sharing location.');
    // Implement SOS logic
  };

  const heatmapPoints = [
    { latitude: 37.78825, longitude: -122.4324, weight: 1 },
    { latitude: 37.78825, longitude: -122.4324, weight: 1 },
    // Add more points based on reports
  ];

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={[styles.map, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
          <Text style={{ fontSize: 18, color: '#666' }}>Map View - Web Preview</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 10 }}>Interactive map available on mobile</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 37.78825,
            longitude: location?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Heatmap points={heatmapPoints} />
        </MapView>
      )}

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>

        <View style={styles.fabContainer}>
          <TouchableOpacity style={[styles.fab, { backgroundColor: 'green' }]} onPress={() => handleQuickReport('Safe')}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fab, { backgroundColor: 'orange' }]} onPress={() => handleQuickReport('Crowded')}>
            <Ionicons name="people" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fab, { backgroundColor: 'red' }]} onPress={() => handleQuickReport('Dangerous')}>
            <Ionicons name="warning" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fab, { backgroundColor: 'yellow' }]} onPress={() => handleQuickReport('Suspicious')}>
            <Ionicons name="eye" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.alertsContainer}>
          <Text style={styles.alertsTitle}>Nearby Alerts</Text>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.alertItem}>
                <Text>{item.type} at {item.location} - {item.timestamp}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  sosButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  fabContainer: { position: 'absolute', bottom: 100, right: 20 },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    maxHeight: 200,
  },
  alertsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  alertItem: { padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default SafetyDashboard;
