import { Image, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native"
import { Droplet, Calendar, Bell, Settings, BarChart2, Clock } from "lucide-react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
     

      {/* Water Quality Card */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardHeader}>
          <Droplet size={24} color="#2196F3" />
          <ThemedText type="subtitle">Water Quality</ThemedText>
        </ThemedView>
        <ThemedView style={styles.waterQualityContainer}>
          <ThemedView style={styles.qualityItem}>
            <ThemedView style={[styles.qualityIndicator, { backgroundColor: "#4CAF50" }]} />
            <ThemedText>TDS: 120 ppm</ThemedText>
          </ThemedView>
          <ThemedView style={styles.qualityItem}>
            <ThemedView style={[styles.qualityIndicator, { backgroundColor: "#4CAF50" }]} />
            <ThemedText>pH: 7.2</ThemedText>
          </ThemedView>
          <ThemedView style={styles.qualityItem}>
            <ThemedView style={[styles.qualityIndicator, { backgroundColor: "#4CAF50" }]} />
            <ThemedText>Chlorine: 0.5 mg/L</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.statusText}>All parameters normal</ThemedText>
      </ThemedView>

      {/* Filter Status Card */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardHeader}>
          <BarChart2 size={24} color="#673AB7" />
          <ThemedText type="subtitle">Filter Status</ThemedText>
        </ThemedView>
        <ThemedView style={styles.filterStatusContainer}>
          <ThemedView style={styles.filterItem}>
            <ThemedView style={styles.filterProgress}>
              <ThemedView style={[styles.filterProgressFill, { width: "75%", backgroundColor: "#4CAF50" }]} />
            </ThemedView>
            <ThemedText>Sediment Filter: 75%</ThemedText>
          </ThemedView>
          <ThemedView style={styles.filterItem}>
            <ThemedView style={styles.filterProgress}>
              <ThemedView style={[styles.filterProgressFill, { width: "45%", backgroundColor: "#FF9800" }]} />
            </ThemedView>
            <ThemedText>Carbon Filter: 45%</ThemedText>
          </ThemedView>
          <ThemedView style={styles.filterItem}>
            <ThemedView style={styles.filterProgress}>
              <ThemedView style={[styles.filterProgressFill, { width: "90%", backgroundColor: "#4CAF50" }]} />
            </ThemedView>
            <ThemedText>RO Membrane: 90%</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Quick Actions
      </ThemedText>
      <ThemedView style={styles.quickActionsContainer}>
        <TouchableOpacity>
          <ThemedView style={styles.actionCard}>
            <Calendar size={28} color="#2196F3" />
            <ThemedText style={styles.actionText}>Schedule Service</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedView style={styles.actionCard}>
            <Bell size={28} color="#FF9800" />
            <ThemedText style={styles.actionText}>Notifications</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedView style={styles.actionCard}>
            <Settings size={28} color="#673AB7" />
            <ThemedText style={styles.actionText}>Settings</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* Upcoming Maintenance */}
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Upcoming Maintenance
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.maintenanceItem}>
          <Clock size={20} color="#FF9800" />
          <ThemedView style={styles.maintenanceInfo}>
            <ThemedText type="defaultSemiBold">Filter Replacement</ThemedText>
            <ThemedText>Carbon Filter needs replacement</ThemedText>
          </ThemedView>
          <ThemedText style={styles.maintenanceDate}>May 15</ThemedText>
        </ThemedView>
        <ThemedView style={styles.separator} />
        <ThemedView style={styles.maintenanceItem}>
          <Clock size={20} color="#2196F3" />
          <ThemedView style={styles.maintenanceInfo}>
            <ThemedText type="defaultSemiBold">Regular Maintenance</ThemedText>
            <ThemedText>Scheduled system check</ThemedText>
          </ThemedView>
          <ThemedText style={styles.maintenanceDate}>Jun 10</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Usage Statistics */}
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Water Usage
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.usageContainer}>
          <ThemedView style={styles.usageItem}>
            <ThemedText type="defaultSemiBold" style={styles.usageValue}>
              120L
            </ThemedText>
            <ThemedText>Today</ThemedText>
          </ThemedView>
          <ThemedView style={styles.usageItem}>
            <ThemedText type="defaultSemiBold" style={styles.usageValue}>
              845L
            </ThemedText>
            <ThemedText>This Week</ThemedText>
          </ThemedView>
          <ThemedView style={styles.usageItem}>
            <ThemedText type="defaultSemiBold" style={styles.usageValue}>
              3,240L
            </ThemedText>
            <ThemedText>This Month</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Platform.select({
      ios: "rgba(0,0,0,0.1)",
      android: "rgba(0,0,0,0.1)",
      default: "rgba(0,0,0,0.1)",
    }),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  waterQualityContainer: {
    gap: 12,
    marginBottom: 12,
  },
  qualityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qualityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  filterStatusContainer: {
    gap: 16,
  },
  filterItem: {
    gap: 8,
  },
  filterProgress: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  filterProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Platform.select({
      ios: "rgba(0,0,0,0.1)",
      android: "rgba(0,0,0,0.1)",
      default: "rgba(0,0,0,0.1)",
    }),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
    }),
  },
  actionText: {
    marginTop: 8,
    textAlign: "center",
  },
  maintenanceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenanceDate: {
    color: "#757575",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  usageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  usageItem: {
    alignItems: "center",
  },
  usageValue: {
    fontSize: 20,
    marginBottom: 4,
  },
})

