import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'

const ResultScreen = ({navigation, route}) => {
    const {points} = route.params


  return (
    <View>
      <View>
        <Text>Your Score:</Text>
        <View>
            <Text>{points}</Text>
        </View>
        <Text>
            {points > 50 ? 'Good Job!' : 'You can improve, keep trying!'}
        </Text>
      </View>
      <Button onPress={() => {navigation.navigate('Home')}}>Try Again</Button>
    </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({})