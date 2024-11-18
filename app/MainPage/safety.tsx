import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Safety: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Screen</Text>
      <Text style={styles.description}>
        Your safety is our top priority. Here are some tips to stay safe:
      </Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tip}>1. Always wear a helmet when riding.</Text>
        <Text style={styles.tip}>2. Be aware of your surroundings.</Text>
        <Text style={styles.tip}>3. Use seat belts in vehicles.</Text>
        <Text style={styles.tip}>4. Follow traffic rules and regulations.</Text>
      </View>
      <Button
        title="Learn More"
        onPress={() => alert("More safety tips coming soon!")}
      />
    </View>
  );
};

export default Safety;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5, // For Android shadow
    width: "100%",
    marginBottom: 20,
  },
  tip: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
});
