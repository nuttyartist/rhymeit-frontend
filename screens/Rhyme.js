import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";

import { fetchRyhmes } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { GlobalStyles } from "../constants/styles";
import RhymesCard from "../components/UI/RhymesCard";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

function Rhyme() {
  const [isFetching, setIsFetching] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isSentence, setIsSentence] = useState(false);
  const [rhymesData, setRhymesData] = useState([]);
  const [allRhymeDataSorted, setAllRhymeDataSorted] = useState([]);
  const [
    currentChosenRhymeIndexInSentences,
    setCurrentChosenRhymeIndexInSentences,
  ] = useState(0);
  const [error, setError] = useState();
  const [errorTitle, setErrorTitle] = useState();
  const [firstInputValue, setFirstInputValue] = useState();
  const [secondInputValue, setSceondInputValue] = useState();
  const [previousRandomExamples, setPreviousRandomExamples] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const rhymeTypes = [
    "perfects",
    "identicals",
    "slants",
    "ends",
    "homophones",
    "internals",
    "weaks",
  ];
  const rhymeTypesInfo = [
    "Words where:\n\n* Stressed vowel sound in both words must be identical, as well as any subsequent sounds (or the final syllables in the longer words).\n\n* The sound that manifests immediately prior to that vowel must be different.",
    "Words that satisfy first part of perfect rhymes but not second one.",
    "Words that match vowel sounds and final consonants, but do not require matching consonants before the final syllable.",
    "Words that match final vowel, one consonant before last vowel, and final consonants.",
    "Different words that sounds exactly the same.",
    "Words that rhyme perfectly but not on the final syllable.",
    "Words that match final vowel and final consonants.",
  ];
  const typeInfoExamples = [
    "trouble, bubble\nbean, green\nsurgery, perjury\nfellow, yellow",
    "believe, leave\nsmart, art",
    "cigar, bizarre\nbuilding, digging",
    "dividing, binding\nb-roll, patrol",
    "raise, raze\nwrite, right\nknight, night",
    "cigar, disregard\nrender, surrendered",
    "steady, lazy\nsteely, silky",
  ];
  const examples = [
    ["Saturate in this bitterness", "And this scorching sweetness"],
    ["Do what's right", "With all your ability"],
    ["I shall not live as useless", "I shall redeem others' anguish"],
    ["What do you think", "What do you dream"],
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function getRhymes() {
    setIsFetching(true);
    setIsDataReady(false);
    try {
      setError("");
      const res = await fetchRyhmes(firstInputValue, secondInputValue);

      let allRhymeDataToBeSorted = [];
      for (const [key, value] of Object.entries(res)) {
        allRhymeDataToBeSorted.push(...value);
      }
      // Sorting based on score (3rd element)
      allRhymeDataToBeSorted.sort(function (a, b) {
        return b[2] > a[2];
      });

      setCurrentChosenRhymeIndexInSentences(0);
      setAllRhymeDataSorted(allRhymeDataToBeSorted);
      setRhymesData(res);
      setIsDataReady(true);
    } catch (error) {
      console.log(error);
      setError(
        "There was en error fetching rhymes! Try again in a one minute. If the problem persists, please contact our developers."
      );
      setErrorTitle("Network error");
    }
    setIsFetching(false);
  }

  useEffect(() => {
    if (isSearching) {
      getRhymes();
      setIsSearching(false);
    }
  }, [firstInputValue, secondInputValue]);

  const ref_secondInput = useRef();

  return (
    <SafeAreaView style={styles.rootScreen}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View style={styles.rootParent}>
        <View style={styles.instructionsContainer}></View>
        <View style={styles.inputsContainer}>
          <TextInput
            value={firstInputValue}
            onChangeText={setFirstInputValue}
            placeholder="First sentence or word to rhyme"
            clearButtonMode="while-editing"
            returnKeyType="next"
            style={styles.input}
            onSubmitEditing={() => {
              ref_secondInput.current.focus();
            }}
          />
          <TextInput
            value={secondInputValue}
            onChangeText={setSceondInputValue}
            ref={ref_secondInput}
            placeholder="Second sentence or word to rhyme"
            clearButtonMode="while-editing"
            returnKeyType="search"
            style={[styles.input, styles.input2]}
            onSubmitEditing={() => {
              if (!firstInputValue || !secondInputValue) {
                setError("Inputs must not be empty");
                setErrorTitle("Bad inputs");
              } else if (
                !/^[a-zA-Z,'`’. ]+$/.test(firstInputValue) ||
                !/^[a-zA-Z,'`’. ]+$/.test(secondInputValue)
              ) {
                setError(
                  "Inputs must not contain special characters, only alphabetic letters are allowed."
                );
                setErrorTitle("Bad inputs");
              } else {
                let firstInputValueSplittedCleaned = firstInputValue
                  .split(" ")
                  .filter(Boolean);

                let secondInputValueSplittedCleaned = secondInputValue
                  .split(" ")
                  .filter(Boolean);

                if (
                  firstInputValueSplittedCleaned.length > 1 ||
                  secondInputValueSplittedCleaned.length > 1
                ) {
                  setIsSentence(true);
                } else {
                  setIsSentence(false);
                }

                getRhymes();
              }
            }}
          />
        </View>

        {error && !isFetching && (
          <ErrorOverlay message={error} errorTitle={errorTitle} />
        )}

        {isFetching && <LoadingOverlay />}

        {!isDataReady && !isFetching && (
          <View style={styles.elaborateInstructionsContainer}>
            <Ionicons
              name="information-circle-outline"
              size={30}
              color="white"
            />
            <Text style={styles.elaborateInstructionsText}>
              Enter two sentences or words to find related words that rhyme.
              {"\n\n"} Then, click the "search" button (:
            </Text>
            <View style={styles.exampleButtonContainer}>
              <Pressable
                style={styles.exampleButton}
                onPress={() => {
                  let randNum;

                  if (previousRandomExamples.length === examples.length) {
                    randNum = getRandomInt(examples.length);
                    setPreviousRandomExamples([randNum]);
                  } else {
                    for (let i = 0; i < examples.length - 1; i++) {
                      randNum = getRandomInt(examples.length);
                      if (!previousRandomExamples.includes(randNum)) {
                        setPreviousRandomExamples([
                          ...previousRandomExamples,
                          randNum,
                        ]);
                        break;
                      }
                    }
                  }

                  setFirstInputValue(examples[randNum][0]);
                  setSceondInputValue(examples[randNum][1]);
                  setIsSearching(true);
                }}
              >
                <Text style={styles.exampleButtonTextStyle}>
                  Show me an example
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {isDataReady && (
          <View style={styles.sentencesContainer}>
            <View style={styles.innerSentencesContainer}>
              <Pressable
                onPress={() => {
                  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  if (currentChosenRhymeIndexInSentences <= 0) {
                    setCurrentChosenRhymeIndexInSentences(
                      allRhymeDataSorted.length - 1
                    );
                  } else {
                    setCurrentChosenRhymeIndexInSentences(
                      currentChosenRhymeIndexInSentences - 1
                    );
                  }
                }}
              >
                <View style={styles.sentenceButtonContainer}>
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={45}
                    color="white"
                  />
                </View>
              </Pressable>
              <View style={styles.sentencesTextsContainer}>
                <Text style={[styles.sentencesText, { marginBottom: 10 }]}>
                  {firstInputValue
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, -1)
                    .join(" ") + " "}
                  <Text style={styles.sentencesTextRhyme1}>
                    {allRhymeDataSorted[currentChosenRhymeIndexInSentences][0]}
                  </Text>
                </Text>
                <Text style={[styles.sentencesText]}>
                  {secondInputValue
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, -1)
                    .join(" ") + " "}
                  <Text style={styles.sentencesTextRhyme2}>
                    {allRhymeDataSorted[currentChosenRhymeIndexInSentences][1]}
                  </Text>
                </Text>
                <Text style={[styles.belowSentencesText]}>
                  results: {currentChosenRhymeIndexInSentences + 1}/
                  {allRhymeDataSorted.length}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy);

                  if (
                    currentChosenRhymeIndexInSentences >=
                    allRhymeDataSorted.length - 1
                  ) {
                    setCurrentChosenRhymeIndexInSentences(0);
                  } else {
                    setCurrentChosenRhymeIndexInSentences(
                      currentChosenRhymeIndexInSentences + 1
                    );
                  }
                }}
              >
                <View style={styles.sentenceButtonContainer}>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={45}
                    color="white"
                  />
                </View>
              </Pressable>
            </View>
          </View>
        )}

        {isDataReady && (
          <View style={styles.cardsContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {rhymeTypes.map((rhymeType, index) => {
                if (
                  rhymesData[rhymeType] !== undefined &&
                  rhymesData[rhymeType].length !== 0
                ) {
                  return (
                    <RhymesCard
                      key={index}
                      rhymeType={rhymeType}
                      rhymesData={rhymesData[rhymeType]}
                      typeInfo={rhymeTypesInfo[index]}
                      typeInfoExamples={typeInfoExamples[index]}
                    />
                  );
                }
              })}
              <View style={styles.exampleButtonContainer}>
                <Pressable
                  style={styles.exampleButton}
                  onPress={() => {
                    let randNum;

                    if (previousRandomExamples.length === examples.length) {
                      randNum = getRandomInt(examples.length);
                      setPreviousRandomExamples([randNum]);
                    } else {
                      for (let i = 0; i < examples.length - 1; i++) {
                        randNum = getRandomInt(examples.length);
                        if (!previousRandomExamples.includes(randNum)) {
                          setPreviousRandomExamples([
                            ...previousRandomExamples,
                            randNum,
                          ]);
                          break;
                        }
                      }
                    }

                    setFirstInputValue(examples[randNum][0]);
                    setSceondInputValue(examples[randNum][1]);
                    setIsSearching(true);
                  }}
                >
                  <Text style={styles.exampleButtonTextStyle}>
                    Show me an example
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray800,
  },
  rootParent: {
    backgroundColor: GlobalStyles.colors.gray800,
    flex: 1,
    padding: 0,
  },
  instructionsContainer: {
    alignItems: "center",
  },
  startInstructions: {
    color: "white",
  },
  sentencesContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  innerSentencesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sentenceButtonContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#0076BA",
    // borderRadius: 20,
    // padding: 10,
    // marginHorizontal: 8,
  },
  sentencesTextsContainer: {
    alignItems: "center",
  },
  sentencesText: {
    fontSize: 16,
    color: "white",
  },
  belowSentencesText: {
    marginTop: 20,
    fontSize: 13,
    color: "white",
  },
  sentencesTextRhyme1: {
    color: "#F89F10",
  },
  sentencesTextRhyme2: {
    color: "#62CBC7",
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputsContainer: {
    paddingHorizontal: 30,
  },
  input: {
    marginVertical: 15,
    height: 50,
    fontSize: 19,
    color: "#F89F10",
    backgroundColor: "#3B4252",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input2: {
    marginVertical: 5,
    color: "#62CBC7",
  },
  elaborateInstructionsContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 40,
  },
  elaborateInstructionsText: {
    marginTop: 15,
    color: "white",
    fontSize: 18,
  },
  exampleButtonContainer: {
    marginTop: 25,
  },
  exampleButton: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  exampleButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Rhyme;
