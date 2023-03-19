import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({children, onPress}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 70,
    width: 130,
    height: 70,
    backgroundColor: '#4361ee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white'
  }
})