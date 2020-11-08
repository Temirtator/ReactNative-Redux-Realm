import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    appButtonContainer: {
        backgroundColor: "#00BFFF",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
    }
  });

const AppButton = (props: any) => (
    <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{props.title}</Text>
    </TouchableOpacity>
);

export default AppButton;