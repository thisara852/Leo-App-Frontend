import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ReportIssues = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: "Spam content", reporter: "John Doe", status: "Pending" },
    { id: 2, title: "Inappropriate profile pic", reporter: "Nisal Perera", status: "Pending" },
    { id: 3, title: "Fake post", reporter: "Sajith Fernando", status: "Pending" },
    { id: 4, title: "Offensive comment", reporter: "Amandi Silva", status: "Pending" },
    { id: 5, title: "Bug report", reporter: "Shehan Kumara", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.reporter.toLowerCase().includes(search.toLowerCase())
  );

  const handleDecision = (id, decision) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: decision } : issue
      )
    );
    Alert.alert("Success", `Issue ${decision}`);
  };

  return (
    <View style={styles.container}>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search by title or reporter"
        placeholderTextColor="#555"
        value={search}
        onChangeText={setSearch}
      />

      {/* Issues List */}
      <FlatList
        data={filteredIssues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.issueTitle}>{item.title}</Text>
            <Text style={styles.reporter}>Reported by: {item.reporter}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.resolveBtn}
                onPress={() => handleDecision(item.id, "Resolved")}
              >
                <Text style={styles.btnText}>Resolve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ignoreBtn}
                onPress={() => handleDecision(item.id, "Ignored")}
              >
                <Text style={styles.btnText}>Ignore</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 10, color: "#FFD700" },

  search: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#222",
    borderColor: "#555",
    color: "#fff",
  },

  card: {
    backgroundColor: "#111",
    padding: 18,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD70030",
  },

  issueTitle: { fontSize: 18, fontWeight: "bold", color: "#FFD700" },
  reporter: { fontSize: 14, color: "#fff", marginTop: 4 },
  status: { fontSize: 14, color: "#ccc", marginTop: 2 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  resolveBtn: {
    backgroundColor: "#00C851",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  ignoreBtn: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});

export default ReportIssues;
