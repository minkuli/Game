import { View, StyleSheet, Dimensions } from "react-native"
import { Colors } from "../../constants/colors";

interface CardProps {
    children: React.ReactNode;
}

export const Card = (props: CardProps) => {
    const {children} = props;
    return <View style={styles.card}>{children}</View>
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center', // position elements along main axis which is top-bottom by default
        alignItems: 'center', // position elements along cross axis which is left-right by default
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: deviceWidth < 380 ? 12 : 24,
        backgroundColor: Colors.primary3,
        borderRadius: 8,
        elevation: 14,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
    });
