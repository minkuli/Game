import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Title } from "../components/ui/Title";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";


interface StartGamesScreenProps {
  onPickNumber: (selectedNumber: number) => void;
} 

export const StartGamesScreen = (props: StartGamesScreenProps) => {
  const {onPickNumber} = props;
  const [enteredNumber, setEnteredNumber] = useState<string>('');

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (inputText: string) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredNumber('');
  }

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }
    onPickNumber(chosenNumber);
  }

  const marginTopValue = height < 380 ? 30 : 100;

   return  (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, {marginTop: marginTopValue}]}>
          <Title>Guess my number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput 
              style={styles.userInput} 
              maxLength={2} 
              keyboardType="number-pad" 
              autoCapitalize="none" 
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
              />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card> 
        </View>       
      </KeyboardAvoidingView>
    </ScrollView>
   )
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },
  userInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent1,
    borderBottomWidth: 2,
    color: Colors.accent1,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1
  }
});