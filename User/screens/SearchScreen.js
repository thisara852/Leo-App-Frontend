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

// Fix: Use Expo vector icons

import { Ionicons } from "@expo/vector-icons";



// Colors

const PRIMARY_GOLD = "#FFC700";

const SECONDARY_DARK = "#1F1F1F";

const BG_DARK = "#000000";

const INACTIVE_TAB_COLOR = "#888";



// --- Mock Data ---

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



// --- Bottom Navigation Component ---

const BottomNav = ({ currentScreen, setScreen }) => {

  const tabs = [

    { name: "HomeFeed", icon: "home-outline" },

    { name: "Search", icon: "search-outline" },

    { name: "Notification", icon: "notifications-outline" },

    { name: "Setting", icon: "settings-outline" },

    { name: "Profile", icon: "person-outline" },

  ];



  return (

    <View style={styles.bottomNav}>

      {tabs.map((tab) => (

        <TouchableOpacity

          key={tab.name}

          onPress={() => setScreen(tab.name)}

          style={styles.navItem}

        >

          <Ionicons

            name={tab.icon}

            size={26}

            color={currentScreen === tab.name ? PRIMARY_GOLD : INACTIVE_TAB_COLOR}

          />

        </TouchableOpacity>

      ))}

    </View>

  );

};



// --- List Item Component ---

const ListItem = ({ item, setScreen }) => (

  <TouchableOpacity

    style={styles.listItemContainer}

    onPress={() => {

      const screenType = item.id.startsWith("d") ? "District" : "Clubs";

      const params = item.id.startsWith("d")

        ? { districtId: item.id, districtName: item.name }

        : { clubId: item.id, clubName: item.name };

     

      setScreen(screenType, params);

    }}

  >

    <Image

      style={styles.entityImage}

      source={{ uri: item.imageUri }}

    />

    <View style={styles.textContainer}>

      <Text style={styles.entityName}>{item.name}</Text>

      {item.location && <Text style={styles.entityLocation}>{item.location}</Text>}

    </View>

  </TouchableOpacity>

);



// --- Main Search Screen ---

const SearchScreen = ({ setScreen }) => {

  const [activeTab, setActiveTab] = useState("District");

  const [searchQuery, setSearchQuery] = useState("");



  const originalData = activeTab === "District" ? DISTRICT_DATA : CLUB_DATA;

 

  const filteredData = originalData.filter(item =>

    item.name.toLowerCase().includes(searchQuery.toLowerCase())

  );



  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />



      <View style={styles.container}>

        {/* Header - Word 'Explore' removed */}

        <View style={styles.topHeader}>

          <TouchableOpacity onPress={() => setScreen("HomeFeed")}>

            <Ionicons name="arrow-back" size={28} color="#FFF" />

          </TouchableOpacity>

        </View>



        {/* Search Bar */}

        <View style={styles.searchBarContainer}>

          <Ionicons name="search" size={20} color={INACTIVE_TAB_COLOR} style={{ marginRight: 10 }} />

          <TextInput

            style={styles.searchInput}

            value={searchQuery}

            onChangeText={setSearchQuery}

            placeholder={activeTab === "District" ? "Search districts..." : "Search clubs..."}

            placeholderTextColor="#888"

          />

          {searchQuery.length > 0 && (

            <TouchableOpacity onPress={() => setSearchQuery("")}>

               <Ionicons name="close-circle" size={18} color={INACTIVE_TAB_COLOR} />

            </TouchableOpacity>

          )}

        </View>



        {/* Toggle Tabs */}

        <View style={styles.toggleContainer}>

          {["District", "Clubs"].map((tab) => (

            <TouchableOpacity

              key={tab}

              style={[styles.toggleButton, activeTab === tab && styles.activeToggleButton]}

              onPress={() => setActiveTab(tab)}

            >

              <Text style={[styles.toggleText, activeTab === tab && { color: PRIMARY_GOLD }]}>

                {tab}

              </Text>

            </TouchableOpacity>

          ))}

        </View>



        {/* Results List */}

        <FlatList

          data={filteredData}

          renderItem={({ item }) => <ListItem item={item} setScreen={setScreen} />}

          keyExtractor={(item) => item.id}

          contentContainerStyle={styles.listContent}

          showsVerticalScrollIndicator={false}

          ListEmptyComponent={

            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>

          }

        />



        <BottomNav currentScreen="Search" setScreen={setScreen} />

      </View>

    </SafeAreaView>

  );

};



const styles = StyleSheet.create({

  safeArea: { flex: 1, backgroundColor: BG_DARK },

  container: { flex: 1, backgroundColor: BG_DARK, paddingHorizontal: 15 },

  topHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },

  searchBarContainer: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#1C1C1C",

    borderRadius: 12,

    marginBottom: 20,

    paddingHorizontal: 15,

    height: 50,

    borderWidth: 1,

    borderColor: "#333",

  },

  searchInput: { flex: 1, color: "#FFF", fontSize: 16 },

  toggleContainer: {

    flexDirection: "row",

    backgroundColor: "#1C1C1C",

    borderRadius: 10,

    marginBottom: 20,

    padding: 4,

  },

  toggleButton: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 8 },

  activeToggleButton: { backgroundColor: "#2C2C2C" },

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

    width: 60,

    height: 60,

    borderRadius: 30,

    marginRight: 15,

    backgroundColor: "#222",

    borderWidth: 1.5,

    borderColor: PRIMARY_GOLD,

  },

  textContainer: { flex: 1 },

  entityName: { color: "#FFF", fontSize: 16, fontWeight: "bold" },

  entityLocation: { color: "#AAA", fontSize: 13, marginTop: 2 },

  emptyText: { color: INACTIVE_TAB_COLOR, textAlign: 'center', marginTop: 50 },

  bottomNav: {

    flexDirection: "row",

    justifyContent: "space-around",

    paddingVertical: 12,

    backgroundColor: SECONDARY_DARK,

    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    borderTopWidth: 1,

    borderTopColor: '#333'

  },

  navItem: { alignItems: 'center', justifyContent: 'center' }

});



export default SearchScreen;
