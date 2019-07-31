import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button(props) {
    return (
        <TouchableOpacity style = {styles.button} onPress = { props.onPress }>
            <Text style = {styles.text}>{ props.text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 40
    },

    button: {
        backgroundColor: 'gray',
        width: 80,
        height: 80,
        borderRadius: 50,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})