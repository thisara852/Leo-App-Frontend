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

// Colors
const PRIMARY_GOLD = "#FFC700";
const SECONDARY_DARK = "#1F1F1F";
const INACTIVE_TAB_COLOR = "#888";

// --- Mock Data (NOW USING GOOGLE IMAGE URLs) ---
const DISTRICT_DATA = [
  {
    id: "d1",
    name: "Leo District D6",
    location: "@Kegalle",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIST9wcqaiYNmtGqlDefMDWcF8w-Xk-sBGrg&s",
  },
  {
    id: "d2",
    name: "Leo District D3",
    location: "@Colombo",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnOe3m1B-bYik3dOIRTNkQBVlgvpuhr8EyMA&s",
  },
  {
    id: "d3",
    name: "Leo District D9",
    location: "@Kandy, Matale, Polonnaruwa, Trincomalee",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLiJsIhmH3Mm6ir2BLo_nJWWioHu6XxCpQg&s",
  },
  {
    id: "d4",
    name: "Leo District D6",
    location: "@Ambalangoda",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFyhxhAz9Zz3r6neO7BxXj6Vt26LjztBmwA&s",
  },
  {
    id: "d5",
    name: "Leo District D5",
    location: "@Negombo",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBJSCnvz68GGy81WT4ffhZrEhdIUXU7aqiw&s",
  },
  {
    id: "d6",
    name: "Leo District D11",
    location: "@Gampaha",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4C0DBkyKSRu1kF9lhy1XoXV47OHeXAwf9A&s",
  },
];

const CLUB_DATA = [
  {
    id: "c1",
    name: "Leo Club of Colombo",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqMLSBwNdcuWteMCfU2_jTo0vEVo8x7jsjQ&s",
  },
  {
    id: "c2",
    name: "Leo Club of Moratuwa",
    imageUri: "https://sliitleo.org/images/club.png",
  },
  {
    id: "c3",
    name: "Leo Club of Royal Achievers",
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0p2EbhIfaLqm-bAUT1ziwRslgrRtfMXL8A&s",
  },
  {
    id: "c4",
    name: "Leo Club of UOC Alumni",
    imageUri: "https://units.kln.ac.lk/cgu/images/2022/leo2022/Leo_logo_2.png",
  },
];

// --- Custom Icon Component ---
const CustomAppIcon = ({ name, size = 24, color }) => (
  <Icon name={name} size={size} color={color} />
);

// --- Bottom Navigation Component ---
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

// --- List Item Component ---
const ListItem = ({ item, setScreen }) => (
  <TouchableOpacity
    style={styles.listItemContainer}
    onPress={() => {
      if (item.id.startsWith("d")) {
        setScreen("District", {
          districtId: item.id,
          districtName: item.name,
        });
        return;
      }

      if (item.id.startsWith("c")) {
        setScreen("Clubs", {
          clubId: item.id,
          clubName: item.name,
        });
        return;
      }
    }}
  >
    <Image
      style={styles.entityImage}
      source={
        item.image
          ? item.image // local image
          : { uri: item.imageUri } // remote google image
      }
    />

    <View style={styles.textContainer}>
      <Text style={styles.entityName}>{item.name}</Text>

      {item.location && (
        <Text style={styles.entityLocation}>{item.location}</Text>
      )}
    </View>
  </TouchableOpacity>
);

// --- Main Search Screen ---
const SearchScreen = ({ setScreen }) => {
  const [activeTab, setActiveTab] = useState("District");
  const [currentBottomScreen, setCurrentBottomScreen] =
    useState("HomeFeed");

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
            <Text
              style={[
                styles.toggleText,
                activeTab === "District" && styles.activeToggleText,
              ]}
            >
              District
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "Clubs" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("Clubs")}
          >
            <Text
              style={[
                styles.toggleText,
                activeTab === "Clubs" && styles.activeToggleText,
              ]}
            >
              Clubs
            </Text>
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
  activeToggleText: { color: "#FFF" },
  listContent: { paddingBottom: 100 },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  entityImage: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 15,
    backgroundColor: "#222",
    borderWidth: 2,
    borderColor: PRIMARY_GOLD,
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
