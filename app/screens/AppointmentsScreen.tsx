import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppointmentsScreen() {
  const appointments = [
    {
      id: '1',
      service: 'RO Service',
      date: '2025-03-20',
      time: '10:00 AM',
      status: 'Upcoming',
      technician: 'John Doe',
    },
    {
      id: '2',
      service: 'Filter Replacement',
      date: '2025-03-22',
      time: '2:30 PM',
      status: 'Confirmed',
      technician: 'Mike Smith',
    },
    {
      id: '3',
      service: 'Water Testing',
      date: '2025-03-25',
      time: '11:00 AM',
      status: 'Pending',
      technician: 'Sarah Johnson',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return '#0088CC';
      case 'Confirmed':
        return '#4CAF50';
      case 'Pending':
        return '#FFA000';
      default:
        return '#666';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.serviceName}>{item.service}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <Text style={styles.detailText}>{item.technician}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
          <Ionicons name="calendar" size={20} color="#0088CC" />
          <Text style={styles.rescheduleText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
          <Ionicons name="close-circle" size={20} color="#FF3B30" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  rescheduleButton: {
    backgroundColor: '#E3F2FD',
  },
  cancelButton: {
    backgroundColor: '#FFF3F2',
  },
  rescheduleText: {
    color: '#0088CC',
    marginLeft: 4,
    fontWeight: '500',
  },
  cancelText: {
    color: '#FF3B30',
    marginLeft: 4,
    fontWeight: '500',
  },
});