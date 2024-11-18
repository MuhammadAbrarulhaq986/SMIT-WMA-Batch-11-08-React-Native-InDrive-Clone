import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SettingHelpSupport: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.description}>
        If you need assistance, please refer to the following options:
      </Text>
      <View style={styles.optionsContainer}>
        <Text style={styles.option}>1. FAQs</Text>
        <Text style={styles.option}>2. Contact Support</Text>
        <Text style={styles.option}>3. Report a Problem</Text>
        <Text style={styles.option}>4. Feedback</Text>
      </View>
      <Button
        title="Get Support"
        onPress={() => alert("Support options coming soon!")}
      />
    </View>
  );
};

export default SettingHelpSupport;

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
  optionsContainer: {
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
  option: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
});
