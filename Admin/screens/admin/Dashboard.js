import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  fetchDashboardStats,
} from "../../services/adminService";

const Dashboard = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats)
    return (
      <LinearGradient colors={["#000", "#0A0A0A"]} style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 100 }} />
      </LinearGradient>
    );

  return (
    <LinearGradient colors={["#000", "#0A0A0A"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Stats Cards */}
        <View style={styles.cardGrid}>
          <StatCard icon="account-check" color="#FFD700" label="Users" value={stats.users} />
          <StatCard icon="post-outline" color="#FFB300" label="Posts" value={stats.posts} />
          <StatCard icon="alert-circle" color="#FF6B6B" label="Reports" value={stats.reports} />
          <StatCard icon="bullhorn" color="#00C8FF" label="Announcements" value={stats.announcements} />
        </View>

        <Text style={styles.sectionTitle}>Admin Controls</Text>

        <AdminButton label="Verify Users" icon="account-check-outline" onPress={() => navigation.navigate("VerifyUsers", { refreshDashboard: loadStats })} />
        <AdminButton label="Manage Posts" icon="post" onPress={() => navigation.navigate("ManagePosts", { refreshDashboard: loadStats })} />
        <AdminButton label="Announcements" icon="bullhorn-outline" onPress={() => navigation.navigate("Announcements", { refreshDashboard: loadStats })} />
        <AdminButton label="Reported Issues" icon="alert-circle-outline" onPress={() => navigation.navigate("ReportedIssues", { refreshDashboard: loadStats })} />
      </ScrollView>
    </LinearGradient>
  );
};

const StatCard = ({ icon, value, label, color }) => (
  <View style={styles.statCard}>
    <Icon name={icon} size={36} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AdminButton = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size={26} color="#000" />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scroll: { padding: 22 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30, marginTop: 20 },
  title: { color: "#FFD700", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#ccc", fontSize: 14, marginTop: 4 },
  cardGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 10 },
  statCard: { width: "47%", backgroundColor: "#111", paddingVertical: 18, borderRadius: 16, alignItems: "center", marginBottom: 18, borderWidth: 1, borderColor: "#FFD70022" },
  statValue: { fontSize: 22, fontWeight: "bold", marginTop: 6 },
  statLabel: { color: "#aaa", fontSize: 14, marginTop: 3 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  button: { backgroundColor: "#FFD700", paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, flexDirection: "row", alignItems: "center", marginVertical: 7 },
  buttonText: { color: "#000", fontSize: 17, fontWeight: "bold", marginLeft: 12 },
});

export default Dashboard;
