import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';

const Option = ({option, onPress, style}) => {
  return (
    <Pressable style={[styles.optionsContainer, style]} onPress={onPress}>
        <View style={{textAlign: 'center', padding: 10, width: 40, height: 40}}>
            <Octicons name="dot" size={24} color="black" />
        </View>
        <Text style={styles.option}>{option}</Text>
    </Pressable>
  )
}

export default Option

const styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00b4d8',
        marginVertical: 10,
        borderRadius: 20
    },
    option:{
        marginLeft: 15,
    }
})