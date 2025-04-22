import { Text, StyleSheet, Platform } from "react-native";
interface TitleProps {
    children: React.ReactNode;
}


export const Title = (props: TitleProps) => {
    const { children } = props;
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ios: 0, android: 2}),
        borderColor: 'white',
        borderRadius: 8,
        padding: 12,
        maxWidth: '80%',
        width: 300,
    }
})
