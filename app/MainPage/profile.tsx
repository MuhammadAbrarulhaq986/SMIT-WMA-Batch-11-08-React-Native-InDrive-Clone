import { getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

interface UserData {
  username: string | null;
  email: string | null;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    console.log("Current user:", user);

    if (user) {
      setUserData({
        username: user.displayName || null,
        email: user.email,
      });
    } else {
      console.log("No user is signed in.");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text}>
            Username: {userData.username ? userData.username : "N/A"}
          </Text>
          <Text style={styles.text}>
            Email: {userData.email ? userData.email : "N/A"}
          </Text>
        </>
      ) : (
        <Text style={styles.text}>No user data found.</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffff",
  },
  heading: {
    fontSize: 30,
    color: "#333",
    marginBottom: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginVertical: 5,
  },
});
