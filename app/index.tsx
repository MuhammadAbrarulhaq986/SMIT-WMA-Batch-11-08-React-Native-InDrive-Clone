import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router"; // Import useRouter
import { signInUser } from "@/config/firebase/firebaseMethods";

const { width } = Dimensions.get("window");

const Index: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize the router

  const userSignUp = async () => {
    try {
      const response = await signInUser(email, password);
      console.log(response);
      // Navigate to the index page if the login is successful
      if (response) {
        // Check if response is valid (you may need to adjust this based on your signInUser  function)
        router.push("/MainPage/home"); // Navigate to the index page
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}> Sign in</Text>
      <Text style={styles.paragraph}>
        New user?{" "}
        <Link href={"/register"} style={styles.anchor}>
          Create an account
        </Link>
      </Text>
      <Text style={styles.inputHead}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail} // Update state on text change
      />
      <Text style={styles.inputHead}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={setPassword} // Update state on text change
        secureTextEntry // Add this for security
      />
      {/* Continue Button  */}
      <TouchableOpacity style={styles.button} onPress={userSignUp}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: "center" }}>
        ______________________or_______________________
      </Text>
      <TouchableOpacity style={styles.linkButton}>
        <View style={styles.buttonContent}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.image}
          />
          <Text style={styles.linkButtonText}>Continue With Google</Text>
        </View>
      </TouchableOpacity>

      <Image source={require("../assets/images/futter.png")} />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    bottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    color: "black",
    width: "100%",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#DAFE2B",
    borderRadius: 99,

    // right: 110,
  },
  heading: {
    fontSize: 30,
    color: "black",
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
    right: 110,
  },
  paragraph: {
    color: "black",
    margin: 10,
    fontWeight: "bold",
    right: 50,
  },
  anchor: {
    fontSize: 18,

    color: "#189AB4",
    margin: 10,
    fontWeight: "bold",
  },
  inputHead: {
    color: "black",
    marginTop: 10,
    marginHorizontal: 10,
    fontWeight: "500",
    right: 115,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    width: "100%", // Make input take full width
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
  linkButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    margin: 10,
    width: "100%", // Make link buttons take full width
  },
  linkButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center content horizontally
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  footerImage: {
    width: width - 40, // Make image take full width minus padding
    height: 100, // Adjust height as needed
    resizeMode: "contain", // Adjust image to fit within the given dimensions
  },
});
