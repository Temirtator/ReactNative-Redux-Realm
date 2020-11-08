import React, { ReactElement } from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface TextInputProps {
    value: string;
    onChangeText: any;
};

const style = StyleSheet.create({
    input: {
        flex: 1, 
        height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    }
})

const TextInputLocal: React.FC<TextInputProps> = (props): ReactElement => {
    return (
        <TextInput  
            style={style.input}
            onChangeText={text => props.onChangeText(text)}
            value={props.value}
        />
    )
};

export default TextInputLocal;