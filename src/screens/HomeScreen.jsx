import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import {CATEGORIES, DIFFICULTY_LEVEL} from '../data/QuestionsCategoryData';
import { useNavigation } from '@react-navigation/native';
import QuizImage from '../assets/QuizImage.png';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
    const [categoryItems, setCategoryItems] = useState(CATEGORIES);
    const [categoriesValue, setCategoriesValue] = useState(null);
    const [difficultyItems, setDifficultyItems] = useState(DIFFICULTY_LEVEL);
    const [difficultyValue, setDifficultyValue] = useState(null);

    const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00296b', padding: 10}}>
      <View style={styles.logoContainer}>
        <Animatable.Image animation='pulse' easing='ease-out' source={QuizImage} style={styles.logo}/>
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.message}>Select category and difficulty level and start the test</Text>
        <Text style={styles.message2}>If you won't choose, questions will be generated randomly</Text>
          
          <View style={styles.dropDownContainer}>
            <Dropdown
              placeholder='Category'
              items={categoryItems}
              setItems={setCategoryItems}
              value={categoriesValue}
              setValue={setCategoriesValue}
              listMode="MODAL"
              modalTitle="Select a Category"
            />
            <Dropdown
              placeholder='Difficulty'
              items={difficultyItems}
              setItems={setDifficultyItems}
              value={difficultyValue}
              setValue={setDifficultyValue}
            /> 
          </View>
        
      </View>
      
      <View style={{flex: 1, zIndex: -1, justifyContent: 'center', alignItems:'center'}}>        
        <TouchableOpacity style={styles.startButtonContainer} onPress={() => 
          navigation.navigate('Quiz', {
            category: categoriesValue,
            difficulty: difficultyValue
        })}>
          <Animatable.View animation='pulse' easing='ease-in-out' iterationCount='infinite' style={styles.startButton}>
            <Text style={styles.buttonText}>Start</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  logo: {
    height: 200,
    width: 340,    
  },
  selectContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  message: {
    color: '#caf0f8',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10
  },
  message2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    padding: 10
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 90,
    width: 120,
    height: 120,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 8,
    borderColor: '#4361ee',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4361ee'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white'
  }
})