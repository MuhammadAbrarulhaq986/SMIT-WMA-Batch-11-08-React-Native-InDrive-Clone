import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase/firebaseConfig";
const { width } = Dimensions.get("window");

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // State for username
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const userRegister = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Get the user object

      // Update the user's profile with the username
      await updateProfile(user, {
        displayName: username, // Set the displayName to the username
      });

      // Show alert on successful registration
      Alert.alert("Success", "User  registered successfully!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log("User  registered successfully with username:", username);
    } catch (error) {
      setError("Registration failed. Please check your credentials.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <Text style={styles.inputHead}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.inputHead}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputHead}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password input
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={userRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Already have an account?{" "}
        <Link href={"/"} style={styles.anchor}>
          Sign In
        </Link>
      </Text>
      <Image
        source={require("../assets/images/register.jpg")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffff", // Light background color
  },
  heading: {
    fontSize: 30,
    color: "#333", // Darker text color
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputHead: {
    color: "#555", // Slightly lighter than the heading
    marginTop: 5,
    marginHorizontal: 10,
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "flex-start", // Align to the left
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  button: {
    backgroundColor: "#DAFE2B", // Use a vibrant color
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: "100%", // Full width button
    alignItems: "center", // Center the text
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  paragraph: {
    color: "#555",
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  anchor: {
    color: "#189AB4",
    fontWeight: "bold",
    textDecorationLine: "underline", // Underline for better visibility
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  image: {
    marginRight: 10,
    width: width - 50, // Make image take full width minus padding
    height: 200, // Adjust height as needed
    resizeMode: "contain", // Adjust image to fit within the given dimensions
  },
});
