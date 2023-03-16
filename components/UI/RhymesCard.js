import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
  Modal,
  ScrollView,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function RhymesCard(props) {
  const [dataToShow, setDataToShow] = useState([]);
  const [showCardContent, setShowCardContent] = useState(true);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useEffect(() => {
    setDataToShow(props.rhymesData.slice(0, 5));
  }, []);

  // let stringContent = dataToShow
  //   .map((couple, index) => {
  //     return couple[0] + ", " + couple[1];
  //   })
  //   .join("      |      ");

  // console.log(stringContent);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalText}>
                  {capitalize(props.rhymeType.slice(0, -1))} Rhymes
                </Text>
              </View>
              <Text style={styles.modalText}>{props.typeInfo}</Text>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalText}>Examples</Text>
              </View>
              <Text style={styles.modalText}>{props.typeInfoExamples}</Text>
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setInfoModalVisible(!infoModalVisible)}
              >
                <Text style={styles.textStyle}>Got it</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.titleContainer}>
        <View style={styles.titleContainerInner}>
          <View style={styles.iconsContainer}>
            <Pressable
              onPress={() => {
                setShowCardContent(!showCardContent);
              }}
            >
              <Ionicons
                name={
                  showCardContent
                    ? "remove-circle-outline"
                    : "add-circle-outline"
                }
                size={22}
                color="white"
              />
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              setShowCardContent(!showCardContent);
            }}
          >
            <Text style={styles.title}>
              {capitalize(props.rhymeType)}
              <Text style={styles.smallTitle}>
                {"  (" +
                  dataToShow.length +
                  "/" +
                  props.rhymesData.length +
                  ")"}
              </Text>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setInfoModalVisible(!infoModalVisible);
            }}
          >
            <View style={styles.iconsContainer}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="white"
              />
            </View>
          </Pressable>
        </View>
      </View>
      {showCardContent && (
        <View style={styles.contentContainer}>
          {dataToShow.map((couple, index) => {
            return (
              <View key={index} style={styles.rhymeContainer}>
                <Text style={styles.rhymes}>
                  <Text style={styles.rhymesFirstInput}>{couple[0]}</Text>
                  {", "}
                  <Text style={styles.rhymesSecondInput}>{couple[1]}</Text>
                </Text>
              </View>
            );
          })}
          {/* <FlatList
            data={dataToShow}
            numColumns={2}
            keyExtractor={(item) => item[0] + item[1]}
            renderItem={({ item }) => {
              return (
                <View style={styles.rhymeContainer}>
                  <Text style={styles.rhymes}>{item[0] + ", " + item[1]}</Text>
                </View>
              );
            }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          /> */}
        </View>
      )}
      {dataToShow.length < props.rhymesData.length && showCardContent && (
        <View>
          {/* <Pressable
            onPress={() => {
              // offset = props.rhymesData.length
              setDataToShow(props.rhymesData.slice(0, dataToShow.length + 10));
            }}
          >
            <View style={styles.showMoreContainerShape}>
              <Text style={styles.showMoreShape}>Show more</Text>
            </View>
          </Pressable> */}
          <View
            style={{
              marginHorizontal: 50,
              marginVertical: 5,
              // borderStyle: "dotted",
              borderWidth: 0.5,
              borderRadius: 1,
              borderColor: "white",
            }}
          />
          <View style={{ marginBottom: 7 }}>
            <Button
              title="Show more"
              color="#0076BA"
              onPress={() => {
                // offset = props.rhymesData.length
                setDataToShow(
                  props.rhymesData.slice(0, dataToShow.length + 10)
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default RhymesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginTop: 30,
    padding: 0,
    backgroundColor: GlobalStyles.colors.gray500,
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleContainerInner: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: GlobalStyles.colors.gray300,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  smallTitle: {
    color: "white",
    fontSize: 13,
  },
  iconsContainer: {
    marginHorizontal: 12,
  },

  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  rhymeContainer: {
    marginTop: 9,
  },
  rhymes: {
    fontSize: 16,
    color: "white",
  },
  rhymesFirstInput: {
    color: "#F89F10",
  },
  rhymesSecondInput: {
    color: "#62CBC7",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    flex: 1,
    marginTop: 200,
    marginBottom: 90,
    marginHorizontal: 20,
    backgroundColor: GlobalStyles.colors.gray300,
    borderRadius: 10,
    padding: 30,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleContainer: {
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: 16,
    marginBottom: 30,
  },
  modalButtonContainer: {
    height: 80,
  },
  button: {
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 20,
    elevation: 2,
    height: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    flex: 1,
    backgroundColor: "#2196F3",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 26,
  },
  showMoreContainerShape: {
    flex: 1,
    backgroundColor: "#0076BA",
    // borderWidth: 1,
    // borderColor: "#0076BA",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 90,
    marginTop: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  showMoreShape: {
    fontSize: 18,
    color: "white",
  },
});
