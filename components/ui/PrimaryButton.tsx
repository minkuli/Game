import { View, Text, Pressable, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors";

interface PrimaryButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
    const {children, onPress} = props;
    const pressHandler = () => {
        onPress?.();
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed}) => pressed ? 
                    [styles.buttonInnerContainer, styles.pressed] 
                    : styles.buttonInnerContainer} 
                onPress={pressHandler} 
                android_ripple={{color: Colors.primary2}}>
                    <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )   
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
})