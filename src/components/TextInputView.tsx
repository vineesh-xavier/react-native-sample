import React, { FC, useState } from "react";
import { View, TextInput, TextInputProps, Text, StyleSheet } from "react-native"
import Colors from "../assets/Colors";

interface TextInputViewProps extends TextInputProps {
    title: string,
    stringValidator?: (text: string) => void,
    errorMessage?: string
}

const TextInputView: FC<TextInputViewProps> = ({
    title,
    stringValidator = () => {},
    errorMessage ,
    ...textStyle }) => {

    const [labelVisible, setLabelVisible] = useState(!!textStyle.value);

    const errorView = errorMessage ? <Text style={style.errorText}>{errorMessage}</Text>
        : null;

    const textInputLabel = labelVisible ? <Text style={style.labelText}>{title}</Text> : null;

    const onTextChange = (text: string) => {
        setLabelVisible(!!text);
        stringValidator(text);
    }

    return (
        <View style={style.container}>
            {textInputLabel}
            <TextInput
                onChangeText={onTextChange.bind(this)}
                {...textStyle}
                style={[style.textInputStyle, textStyle.style, errorMessage? style.errorInput : null]} />
            {errorView}
        </View>
    )
}

export default TextInputView;

const style = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
    labelText: {
    },
    errorText: {
        textAlign: 'right',
        color: Colors.red,
    },
    textInputStyle: {
        borderColor: Colors.loginTextInputBoarder,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        position: 'relative',
    },
    errorInput: {
        borderColor: Colors.red
    }

})