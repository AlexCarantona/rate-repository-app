import { Pressable as NativePressable, Text, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
    pressable : {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        margin: 5
    },
    label : {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: 'white',
        padding: 7
    },
    transparent: {
        backgroundColor: 'hsla(240, 0%, 0%, 0)'
    }
})

const CustomButton = ({bgColor, style, label, ...props}) => {

    const pressableStyle = [
        styles.pressable,
        bgColor === 'transparent' && styles.transparent,
        style
    ]

    const labelStyle= [
        styles.label
    ]


    return (
    <NativePressable style={pressableStyle} {...props}>
        <Text style={labelStyle}>{label}</Text>
    </NativePressable>
    )
}

export default CustomButton