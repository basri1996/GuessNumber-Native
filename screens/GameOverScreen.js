import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen({
  roundsNumber,
  userNumber,
  onStartNewGame,
}) {
  const { width, height } = useWindowDimensions();
  let image = 300;
  if (width < 380) {
    image = 150;
  }
  if (height < 390) {
    image = 80;
  }

  const imageStyle = {
    width: image,
    height: image,
    borderRadius: image / 2,
  };
  let marginT = 70;

  if (height < 480) {
    marginT = 10;
  }
  const gameScreenMargin = {
    marginTop: marginT,
  };
  return (
    <ScrollView style={[styles.screen, gameScreenMargin]}>
      <View style={styles.container}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.textColor}>
          Your phone need <Text style={styles.rounds}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.rounds}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPressFnc={onStartNewGame}>
          Start New Game
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginVertical: 36,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#72063c",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textColor: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
  },
  rounds: {
    color: "#72063c",
  },
});
