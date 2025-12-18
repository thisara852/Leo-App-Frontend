import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getPosts, deletePost } from "../../services/adminService";

const LeoFeedPost = ({ post, onDelete }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.feedPost}>
    {/* Post Header */}
    <View style={styles.postHeader}>
      <Image
        source={
          post.avatar
            ? { uri: post.avatar }
            : require("../../assets/Leo-District-Logo-306-D3-2.png")
        }
        style={styles.postAvatar}
      />
      <View style={styles.postUserInfo}>
        <Text style={styles.postUsername}>{post.author || "Leo-D3"}</Text>
        <Text style={styles.postTime}>{post.date || "Just now"}</Text>
      </View>
    
    </View>

    {/* Post Text */}
    <Text style={styles.postTextGold}>{post.description || post.title}</Text>

    {/* Post Image */}
    <Image
      source={
        post.image
          ? { uri: post.image }
          : require("../../assets/qw.jpg")
      }
      style={styles.feedPostImage}
    />

    {/* Post Footer */}
    <View style={styles.postFooter}>
      <View style={styles.reactionIcons}>
        <Icon
          name="heart-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 15 }}
        />
        <Icon
          name="chatbubble-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 15 }}
        />
        <Icon
          name="paper-plane-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 15 }}
        />
        <Icon
          name="link-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 15 }}
        />
      </View>
      <Text style={styles.likeText}>
        Liked by mr.beast and {post.likes || 0} others
      </Text>
      <Text style={styles.viewCount}>{post.views || 0}K Views</Text>

      {/* Delete button */}
<View style={styles.actions}>
  <TouchableOpacity
    style={styles.approveBtn}
    onPress={() => onApprove(post.id)}
  >
    <Text style={styles.btnText}>Approve</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.deleteBtn}
    onPress={() => onDelete(post.id)}
  >
    <Text style={styles.btnText}>Delete</Text>
  </TouchableOpacity>
</View>

    </View>
  </TouchableOpacity>
);

export default function ManagePosts({ route }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    await deletePost(id);
    Alert.alert("Success", "Post deleted");
    loadPosts();
    route.params?.refreshDashboard?.();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.description?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.toLowerCase().includes(search.toLowerCase()) ||
      post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Search Box */}
      <TextInput
        style={styles.search}
        placeholder="Search by description, title or author"
        placeholderTextColor="#555"
        value={search}
        onChangeText={setSearch}
      />

      {/* Posts Feed */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LeoFeedPost post={item} onDelete={handleDelete}  />
        )}
        refreshing={loading}
        onRefresh={loadPosts}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  topBar: { flexDirection: "row", alignItems: "center", marginTop: 35, marginBottom: 20 },
  titleBar: { fontSize: 24, fontWeight: "bold", marginLeft: 10, color: "#FFD700" },
  search: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#222",
    borderColor: "#555",
    color: "#fff",
  },

  feedPost: {
    backgroundColor: "#111",
    borderRadius: 16,
    marginVertical: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFD70030",
  },
actions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},
approveBtn: {
  backgroundColor: "#00C851",
  padding: 10,
  borderRadius: 8,
  width: "48%",
  alignItems: "center",
},
deleteBtn: {
  backgroundColor: "#ff4444",
  padding: 10,
  borderRadius: 8,
  width: "48%",
  alignItems: "center",
},
btnText: { color: "#fff", fontWeight: "bold" },

  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: "#333" },
  postUserInfo: { flex: 1 },
  postUsername: { color: "#FFD700", fontWeight: "bold", fontSize: 16 },
  postTime: { color: "#ccc", fontSize: 12 },
  bookmarkIcon: { padding: 4 },

  postTextGold: { color: "#FFD700", fontSize: 14, marginBottom: 10 },

  feedPostImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10 },

  postFooter: { marginTop: 5 },
  reactionIcons: { flexDirection: "row", marginBottom: 5 },
  likeText: { color: "#fff", fontSize: 12, marginBottom: 2 },
  viewCount: { color: "#fff", fontSize: 12, marginBottom: 5 },
  
});
