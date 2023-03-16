import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  ScrollView,
  Linking,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function Settings() {
  return (
    <SafeAreaView style={styles.rootScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rootParent}>
          <View style={styles.rowContainer}>
            <View style={styles.urlButtonContainer}>
              <Button size={20} title="Rate App" color="#0076BA" />
            </View>
            <View style={styles.urlButtonContainer}>
              <Button
                size={20}
                title="Contact Us"
                color="#0076BA"
                onPress={() => Linking.openURL("mailto:contact@rhymeit.io")}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.urlButtonContainer}>
              <Button
                size={20}
                title="rhymeit.io"
                color="#0076BA"
                onPress={() => Linking.openURL("https://rhymeit.io")}
              />
            </View>
          </View>
          {/* <Pressable onPress={() => {}}>
          <View style={styles.urlButtonContainerShape}>
            <Text style={styles.urlButtonShape}>rhymeit.io</Text>
          </View>
        </Pressable> */}
          <Text style={styles.textTitle}>About the app</Text>
          <View style={styles.textBodyContainer}>
            <Text style={styles.textBody}>
              {
                "While many rhyming websites are available, nothing is quite like Rhymeit. When you enter two words, this is what happens:\n\nWe start by searching for synonyms to your inputs, then we decline, conjugate, and find all their base forms. Then, using our in-house algorithm, we match all the forms related to the first input to all the forms of the second one. That's how we find if they rhyme and what type of rhyme (eg, perfect, slant, etc...) they create together. After that, we score each rhyme couple, again using our in-house algorithm. Finally, the results show up here on this app (:"
              }
            </Text>
          </View>
          <Text style={styles.textTitle}>About the author</Text>
          <View style={styles.textBodyContainer}>
            <Text style={styles.textBody}>
              Hello, I'm{" "}
              <Text
                style={{ color: "#0076BA" }}
                onPress={() =>
                  Linking.openURL("https://www.rubymamistvalove.com")
                }
              >
                Ruby Mamistvalove
              </Text>
              . I created Rhymeit. I love translating poems from my native
              language (Hebrew) to English. Sometimes though, I would have a
              hard time rhyming two words. I used a similar process to the one
              above that worked well for me and decided to automate it, and the
              result is this app.{"\n\n"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray800,
  },
  rootParent: {
    backgroundColor: GlobalStyles.colors.gray800,
    flex: 1,
    padding: 0,
    alignItems: "center",
  },
  rowContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: "white",
  },
  urlButtonContainer: {
    flex: 1,
  },
  urlButtonContainerShape: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0076BA",
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 20,
  },
  urlButtonShape: {
    fontSize: 18,
    color: "#0076BA",
  },
  textTitle: {
    marginTop: 20,
    fontSize: 24,
    color: "white",
  },
  textBodyContainer: {
    paddingHorizontal: 44,
  },
  textBody: {
    marginTop: 20,
    fontSize: 17,
    color: "white",
  },
});
