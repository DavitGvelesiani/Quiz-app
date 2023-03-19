import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Option from '../components/Option';
import Button from '../components/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const QuizScreen = ({route}) => {
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions]= useState([]);
    const [points, setPoints] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isLoading, setIsloading] = useState(false);

    const navigation = useNavigation();

    const {category, difficulty} = route.params;


    useEffect(() => {
      setIsloading(true);
      axios.get(`https://opentdb.com/api.php?amount=10&${category}&${difficulty}`)
      .then((response) => {
          const allQuestions = response.data.results;
          setQuestions(allQuestions);
          setOptions(generateOptionsAndShuffle(response.data.results[0]))
          setIsloading(false)
      })
      .catch(error => {console.log(error)})
    }, [])

    const generateOptionsAndShuffle = (question) => {
      const options= [...question?.incorrect_answers]
      options.push(question?.correct_answer)
   
      shuffleArray(options)
      
      return options
    }

    const handlSelectedOption = (option) => {
      setIsAnswered(true);
      setSelectedAnswer(option)
      if(option === questions[questionIndex]?.correct_answer){
        setPoints(points + 10);
      }
    }

    const handleNextPress = () =>{
      setQuestionIndex(questionIndex + 1)
      setOptions(generateOptionsAndShuffle(questions[questionIndex + 1]))
      setSelectedAnswer(null);
      setIsAnswered(false);
    }

    const progressPercentage = Math.floor((questionIndex/10) * 100);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00296b', padding: 10}}> 
      
      <View style={styles.progressContainer}>
        
        <View style={[styles.progress, {padding: 10}]}>
          <Text style={{color: '#caf0f8', fontWeight: 'bold'}}>Quiz Challenge</Text>
          <Text style={{color: '#caf0f8'}}>Points: {points}</Text>
        </View>

        <View style={[styles.progress, {marginHorizontal: 10}]}>
          <Text style={{color: '#caf0f8', fontWeight: 'bold'}}>Your Progress</Text>
          <Text style={{color: '#caf0f8'}}>({questionIndex + 1}/10) questions answered</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <Text style={[styles.progressBar, {width: `${progressPercentage}%`,}]} />
        </View>
      
      </View>

      {isLoading ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#ffc300" />
        </View>
      : 
        <Animatable.View animation='flipInX' style={styles.questionAreaContainer}>
          <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
          <View style={styles.optionsContainer}>
            <FlatList 
              data={options}
              renderItem={({item}) => <Option option={item} onPress={() => handlSelectedOption(item)} style={
                isAnswered && item === questions[questionIndex]?.correct_answer ? 
                  {backgroundColor: '#c7f9cc', borderWidth: 1, borderColor: 'green'} : 
                item === selectedAnswer && item !== questions[questionIndex]?.correct_answer && 
                  {backgroundColor: '#f08080', borderWidth: 1, borderColor: 'red'}
              }/>}
              keyExtractor={() => Math.random()}
            />
          </View>
        </Animatable.View>}

      <View style={{justifyContent: 'center', alignItems:'center'}}>
        {isAnswered && selectedAnswer === questions[questionIndex]?.correct_answer ?
          <Animatable.View animation='zoomIn' style={styles.messageContainer}>
            <FontAwesome5 name="smile-beam" size={28} color="green" />
            <Text style={styles.message}>Correct!</Text>
          </Animatable.View>
        : isAnswered && selectedAnswer !== questions[questionIndex]?.correct_answer && 
          <Animatable.View animation='zoomIn' style={styles.messageContainer}>
            <FontAwesome5 name="sad-tear" size={28} color="red" />
            <Text style={styles.message}>Oops... Correct answer was {questions[questionIndex]?.correct_answer}</Text>
          </Animatable.View>
        }
      </View>

      {questionIndex!==9 && <Button onPress={handleNextPress}>Next</Button> }

      {questionIndex===9 && <Button onPress={() => {
        navigation.navigate('Result', {points: points});
      }}>Show Result</Button> }

    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: '#023e8a',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fdc500'
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  questionAreaContainer: {
    marginTop: 15,
    backgroundColor: '#caf0f8',
    padding: 10,
    borderRadius: 6
  },
  question: {
    fontSize: 18,
    fontWeight: "bold"
  },
  optionsContainer: {
    marginTop: 12
  },
  messageContainer: {
    marginTop: 15,
    backgroundColor: '#caf0f8',
    width: 350,
    height: 100,
    borderWidth: 2,
    borderColor: '#0077b6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    marginLeft: 10
  },
  progressBarContainer: {
    backgroundColor: "#caf0f8",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20
  },
  progressBar: {
    backgroundColor: "#ff8fab",
    borderRadius: 12,
    position: "absolute",
    left: 0,
    height: 10,
    right: 0,
    marginTop: 20,
  }

})