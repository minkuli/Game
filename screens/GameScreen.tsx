import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Alert, FlatList, Dimensions, useWindowDimensions } from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { Ionicons } from '@expo/vector-icons';
import { GuessLogItem } from "../components/GuessLogItem";

interface GameScreenProps {
    userChoice: number;
    onGameOver: (numberOfRounds: number) => void;
}

const generateRandomBetween = (min: number, max: number, exclude: number) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }   
};

let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen = (props: GameScreenProps) => {
    const {userChoice, onGameOver} = props;
    const initialGuess = useMemo(() => generateRandomBetween(minBoundary, maxBoundary, userChoice), []);
    const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
    const [rounds, setRounds] = useState<number[]>([initialGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(rounds.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    const nextGuessHandler = (direction: 'lower' | 'greater') => {
        if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert("Don't lie!", "You know that this is wrong", [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }    
        if(direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNum);
        setRounds((prevRounds) => [newRndNum, ...prevRounds]);
    }

    let content = (
    <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='remove' size={24} color='white' />
                    </PrimaryButton>
                </View>  
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="add" size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    );

    if(width > 500) {
        content = (
           <>

              <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='remove' size={24} color='white' />
                  </PrimaryButton>
                </View> 
                <NumberContainer>{currentGuess}</NumberContainer>   
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="add" size={24} color='white' />
                    </PrimaryButton>
                </View> 
              </View>
           </>
        )
    }

    return (
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
                {content}
            <View style={styles.listContainer}>
                {/* {rounds.map(round => <Text key={round}>{round}</Text>)}
                 */}
                <FlatList 
                    data={rounds}
                    keyExtractor={item => item.toString()}
                    renderItem={({item, index}) => <GuessLogItem guess={item} round={rounds.length - index}/>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        flexDirection: 'row',
      },
    buttonContainer: {
    flex: 1
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})
