import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar} from 'expo-status-bar'
import { StartGamesScreen } from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import { Colors } from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';


export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [rounds, setRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  const pickedNumberHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  } 

  const gameOverHandler = (numberOfRounds: number) => {
    setGameIsOver(true);
    setRounds(numberOfRounds)
  }

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGameIsOver(true);
    setRounds(0);
  }

  let screen = <StartGamesScreen onPickNumber={pickedNumberHandler}/>;

  if(userNumber) {
    screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen rounds={rounds} number={userNumber} onStartNewGame={startNewGameHandler}/>;
  }

  return (
    <>
    <StatusBar style="light" />
    <LinearGradient colors={[Colors.primary3, Colors.accent1]} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/dices.jpg')} 
        style={styles.rootScreen}
        resizeMode='cover'
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>  
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
