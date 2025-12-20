import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// --- Colors ---
const PRIMARY_GOLD = "#FFC700";
const SECONDARY_DARK = "#1F1F1F";
const INACTIVE_TAB_COLOR = "#888";

// --- MOCK DATA WITH IMAGE URLs (Uploaded Logos) ---
const DISTRICT_DATA = [
  {
    id: "d1",
    name: "Leo District D2",
    location: "@Anuradhapura",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFlbJqQyFbUexU9icuUm4XIAeCd8Ia7ymVw&s",
  },
  {
    id: "d2",
    name: "Leo District D3",
    location: "@Colombo",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQsmAOJAK5osB0Tw5q8E6Wbw1IQo0o39piQ&s",
  },
  {
    id: "d3",
    name: "Leo District D9",
    location: "@Kandy, Matale, Polonnaruwa, Trincomalee",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIST9wcqaiYNmtGqlDefMDWcF8w-Xk-sBGrg&s",
  },
  {
    id: "d4",
    name: "Leo District D6",
    location: "@Ambalangoda",
    imageUri: "https://sliitleo.org/images/club.png",
  },
  {
    id: "d5",
    name: "Leo District D5",
    location: "@Negombo",
    imageUri: "https://media.licdn.com/dms/image/v2/C4D0BAQEpRH5Wii5OvA/company-logo_200_200/company-logo_200_200/0/1630528641580?e=2147483647&v=beta&t=g4ckceExlblKW1i0THM7nT0_vAWjnvM7p7G2H8s_3e4",
  },
  {
    id: "d6",
    name: "Leo District D11",
    location: "@Gampaha",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EiVqFMkA-juJ0vDjMb-iv1N6VnZOAtFfqw&s",
  },
  {
    id: "d7",
    name: "Leo District D12",
    location: "@Kurunegala",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb4rs0Q_v7mjq6xcBqWvX35rg41IroPh3Evg&s",
  },
  {
    id: "d8",
    name: "Leo District D1",
    location: "@Colombo",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Na2eWVuEBc4MurYdnhXGXQRRQUqpmjcKcQ&s",
  },
];

const CLUB_DATA = [
  {
    id: "c1",
    name: "Leo Club of Colombo",
    location: null,
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Na2eWVuEBc4MurYdnhXGXQRRQUqpmjcKcQ&s",
  },
  {
    id: "c2",
    name: "Leo Club of Moratuwa",
    location: null,
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJIPdpETWGu-SOug-Tg9kATYwxfgeyeXrsg&s",
  },
  {
    id: "c3",
    name: "Leo Club of Royal Achievers",
    location: null,
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpo1IY7JKKC7_IrBbWI964qwBasoYHtK_oRQ&s",
  },
  {
    id: "c4",
    name: "Leo Club of UOC Alumni",
    location: null,
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFyhxhAz9Zz3r6neO7BxXj6Vt26LjztBmwA&s",
  },
];

// --- Custom Icon ---
const CustomAppIcon = ({ name, size = 24, color }) => (
  <Icon name={name} size={size} color={color} />
);

// --- Bottom Navigation ---
const BottomNav = ({ currentScreen, setScreen }) => (
  <View style={styles.bottomNav}>
    {["HomeFeed", "Search", "Notification", "Setting", "Profile"].map(
      (screen) => {
        let iconName;
        switch (screen) {
          case "HomeFeed":
            iconName = "home-outline";
            break;
          case "Search":
            iconName = "search-outline";
            break;
          case "Notification":
            iconName = "notifications-outline";
            break;
          case "Setting":
            iconName = "settings-outline";
            break;
          case "Profile":
            iconName = "person-outline";
            break;
        }

        return (
          <TouchableOpacity
            key={screen}
            onPress={() => setScreen(screen)}
            style={{ alignItems: "center" }}
          >
            <CustomAppIcon
              name={iconName}
              size={28}
              color={
                currentScreen === screen ? PRIMARY_GOLD : INACTIVE_TAB_COLOR
              }
            />
          </TouchableOpacity>
        );
      }
    )}
  </View>
);

// --- List Item ---
const ListItem = ({ item, setScreen }) => (
  <TouchableOpacity
    style={styles.listItemContainer}
    onPress={() => {
      if (item.id.startsWith("d")) {
        setScreen("District", {
          districtId: item.id,
          districtName: item.name,
        });
      } else {
        setScreen("Clubs", {
          clubId: item.id,
          clubName: item.name,
        });
      }
    }}
  >
    <Image
      style={styles.entityImage}
      source={{ uri: item.imageUri }}
    />
    <View style={styles.textContainer}>
      <Text style={styles.entityName}>{item.name}</Text>
      {item.location && (
        <Text style={styles.entityLocation}>{item.location}</Text>
      )}
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---
const SearchScreen = ({ setScreen }) => {
  const [activeTab, setActiveTab] = useState("District");
  const [currentBottomScreen, setCurrentBottomScreen] =
    useState("Search");

  const dataToDisplay =
    activeTab === "District" ? DISTRICT_DATA : CLUB_DATA;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => setScreen("HomeFeed")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === "District"
                ? "Search your favorite district..."
                : "Search your club..."
            }
            placeholderTextColor="#888"
          />
          <Text style={styles.searchIcon}>🔎</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "District" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("District")}
          >
            <Text style={styles.toggleText}>District</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "Clubs" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("Clubs")}
          >
            <Text style={styles.toggleText}>Clubs</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dataToDisplay}
          renderItem={({ item }) => (
            <ListItem item={item} setScreen={setScreen} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <BottomNav
          currentScreen={currentBottomScreen}
          setScreen={(screenName) => {
            setCurrentBottomScreen(screenName);
            setScreen(screenName);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 15 },
  topHeader: { paddingVertical: 10 },
  backArrow: { color: "#FFF", fontSize: 24 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: { flex: 1, color: "#FFF", fontSize: 16 },
  searchIcon: { fontSize: 20, color: "#FFF" },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#333",
  },
  toggleText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  listContent: { paddingBottom: 100 },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  entityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: PRIMARY_GOLD,
    backgroundColor: "#222",
  },
  textContainer: { justifyContent: "center" },
  entityName: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  entityLocation: { color: "#AAA", fontSize: 14 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: SECONDARY_DARK,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});

export default SearchScreen;
