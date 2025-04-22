import { Text, StyleSheet, View, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

interface NumberContainerProps {
    children: number;
}

export const NumberContainer = (props: NumberContainerProps) => {
    const {children} = props;
    return <View style={styles.view}>
        <Text style={styles.text}>{children}</Text>
    </View>
}

const deviceWidth = Dimensions.get('window').width; // on android window is excluding status bar and screen is including it

const styles = StyleSheet.create({
    view: {
        borderWidth: 2,
        borderColor: Colors.accent1,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 10,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold',
        color: Colors.accent1
    }
})
