import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import {CATEGORIES, DIFFICULTY_LEVEL} from '../store/QuestionsCategoryData';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [categoryItems, setCategoryItems] = useState(CATEGORIES);
    const [categoriesValue, setCategoriesValue] = useState(null);
    const [difficultyItems, setDifficultyItems] = useState(DIFFICULTY_LEVEL);
    const [difficultyValue, setDifficultyValue] = useState(null);

    const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Text>Select category and difficulty level and start the test</Text>
            <View >
                <Dropdown
                    placeholder='Category'
                    items={categoryItems}
                    setItems={setCategoryItems}
                    value={categoriesValue}
                    setValue={setCategoriesValue}
                    style={styles.dropdown}
                />
                <Dropdown
                    placeholder='Difficulty'
                    items={difficultyItems}
                    setItems={setDifficultyItems}
                    value={difficultyValue}
                    setValue={setDifficultyValue}
                    style={styles.dropdown}
                /> 
            </View>
        
      </View>

      <Button onPress={() => navigation.navigate('Quiz', {
        category: categoriesValue,
        difficulty: difficultyValue
      })}>Start</Button>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    dropDownContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdown: {
        

    }
})