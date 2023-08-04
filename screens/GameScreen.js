import {
  View,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";
import { useState, useEffect } from "react";
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundery = 99;

export default function GameScreen({ userNumber, gameOverHandler }) {
  const initialGuess = generateRandomBetween(1, 99, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessArr, setGuessArr] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      gameOverHandler(guessArr.length);
    }
  }, [userNumber, currentGuess, gameOverHandler]);

  useEffect(() => {
    (minBoundary = 1), (maxBoundery = 99);
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert(" Don't lie!", "You know that this is wrong..", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundery = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundery,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessArr((prev) => [newRndNumber, ...prev]);
  }

  const guessLength = guessArr.length;

  let content = (
    <>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.textCont}>Higher or lower?</Text>
        </View>

        <View style={styles.btnContainer}>
          <View style={styles.buttonCont}>
            <PrimaryButton onPressFnc={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonCont}>
            <PrimaryButton onPressFnc={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <Title>Opponent's Guess</Title>
        <View style={styles.buttonWide}>
          <View style={styles.btnView}>
            <PrimaryButton onPressFnc={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.btnView}>
            <PrimaryButton onPressFnc={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessArr}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 18,
  },
  card: {
    padding: 24,
    backgroundColor: "#3b021f",
    borderRadius: 6,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 24,
  },
  btnContainer: {
    flexDirection: "row",

    marginTop: 18,
  },
  buttonCont: {
    width: "50%",
  },
  textCont: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ddb52f",
  },
  textContainer: {
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    paddingTop: 12,
  },
  buttonWide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    flex: 1,
  },
});
