import { Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";


interface InstructionTextProps {
    children: React.ReactNode;
    style?: object;
}

export const InstructionText = (props: InstructionTextProps) => {
    const {children, style} = props;
    return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        color: Colors.accent1,
        fontSize: 20,
        fontFamily: 'open-sans',
      },
})