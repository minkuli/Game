import {Text, View, StyleSheet} from "react-native";
import { Colors } from "../constants/colors";

interface GuessLogItemProps {
    guess: number;
    round: number;
}

export const GuessLogItem = (props: GuessLogItemProps) => {

    const {guess, round} = props;

    return <View style={styles.rootContainer}>
        <Text style={styles.text}>#{round}</Text>
        <Text style={styles.text}>Opponent's guess {guess}</Text>
    </View>
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderColor: Colors.primary2,
        borderWidth: 1,
        borderRadius: 40,
        marginVertical: 8,
        backgroundColor: Colors.accent1,
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.26,
        shadowRadius: 3,
    },
    text: {     
        fontSize: 20,
        fontFamily: 'open-sans',
    }
})