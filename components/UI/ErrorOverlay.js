import { View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message, errorTitle }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{errorTitle}</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // padding: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.gray800,
  },
  text: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
