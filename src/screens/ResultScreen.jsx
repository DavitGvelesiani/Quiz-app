import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import * as Animatable from 'react-native-animatable';
import backgroundImage from '../../assets/background2.png'

const ResultScreen = ({navigation, route}) => {
    const {points} = route.params

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00296b', padding: 10}}>
      <ImageBackground source={backgroundImage} resizeMode='cover' style={{flex: 1}} imageStyle={{tintColor: '#03045e'}}> 
        <View style={styles.scoreMessageContainer}>
          <Text style={styles.scoreMessage}>Your Score:</Text>
          <View style={styles.scoreContainer}>
              <Animatable.Text style={[styles.score, points > 50 ? {color: '#76c893'} : {color: '#ffc300'}]} animation='pulse' easing='ease-in-out' iterationCount='infinite'>
                {points}
              </Animatable.Text>
          </View>
          <Text style={styles.message}>
              {points > 50 ? 'Good Job!' : 'You can improve, keep trying!'}
          </Text>
        </View>
        <Button onPress={() => {navigation.navigate('Home')}}>Try Again</Button>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  scoreMessageContainer: {
    marginTop: 80, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  scoreMessage: {
    color: '#caf0f8',
    fontWeight: 'bold',
    fontSize: 50,
  },
  scoreContainer: {
    marginTop: 40,
    textAlign: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#560bad'
  },
  score: {
    fontSize: 70,
    fontWeight: 'bold',
    padding: 10
  },
  message: {
    marginTop: 30,
    color:'white',
    fontSize: 20,
    fontStyle: 'italic'
  }
})