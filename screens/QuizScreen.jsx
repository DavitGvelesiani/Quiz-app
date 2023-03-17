import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import axios from 'axios';
import Option from '../components/Option';
import Button from '../components/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const shuffleArray=(array)=> {
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

    const navigation = useNavigation();

    const {category, difficulty} = route.params;


    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
        .then((response) => {
            const allQuestions = response.data.results;
            setQuestions(allQuestions);
            setOptions(generateOptionsAndShuffle(response.data.results[0]))
        })
        .catch(error => {console.log(error)})
    }, [])

    const generateOptionsAndShuffle=(_question)=>{
      const options= [..._question.incorrect_answers]
      options.push(_question.correct_answer)
   
      shuffleArray(options)
      
      return options
    }

    const handlSelectedOption = (option) => {
      setIsAnswered(true);
      setSelectedAnswer(option)
      if(option===questions[questionIndex]?.correct_answer){
        setPoints(points + 10);
      }

      if(questionIndex===9){
        // handleShowResult()
      }
    }

    const handleNextPress=()=>{
      setQuestionIndex(questionIndex+1)
      setOptions(generateOptionsAndShuffle(questions[questionIndex+1]))
      setSelectedAnswer(null);
      setIsAnswered(false);
    }

    const progressPercentage = Math.floor((questionIndex/10) * 100);

  return (
    <SafeAreaView>
      <View style={[styles.progressContainer, {padding: 10}]}>
        <Text>Quiz Challenge</Text>
        <Text>Points: {points}</Text>
      </View>

      <View style={[styles.progressContainer, {marginHorizontal: 10}]}>
        <Text>Your Progress</Text>
        <Text>({questionIndex + 1}/10) questions answered</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <Text style={[styles.progressBar, {width: `${progressPercentage}%`,}]} />
      </View>

      <View style={styles.questionAreaContainer}>
        <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
        <View style={styles.optionsContainer}>
          <FlatList 
            data={options}
            renderItem={({item}) => <Option option={item} onPress={() => handlSelectedOption(item)} style={
              isAnswered && item === questions[questionIndex]?.correct_answer ? 
                {backgroundColor: 'green'} : 
              item === selectedAnswer && item !== questions[questionIndex]?.correct_answer && 
                {backgroundColor: 'red'}
            }/>}
            keyExtractor={() => Math.random()}
          />
        </View>
      </View>

      <View>
        {isAnswered && selectedAnswer === questions[questionIndex]?.correct_answer ?
          <View style={styles.messageContainer}>
            <FontAwesome5 name="smile-beam" size={24} color="green" />
            <Text style={styles.message}>Correct!</Text>
          </View>
        : isAnswered && selectedAnswer !== questions[questionIndex]?.correct_answer && 
          <View style={styles.messageContainer}>
            <FontAwesome5 name="sad-tear" size={24} color="red" />
            <Text style={styles.message}>Oops... Correct answer was {questions[questionIndex]?.correct_answer}</Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  questionAreaContainer: {
    marginTop: 10,
    backgroundColor: '#F0F8FF',
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    marginLeft: 10
  },
  progressBarContainer: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  progressBar: {
    backgroundColor: "#FFC0CB",
    borderRadius: 12,
    position: "absolute",
    left: 0,
    height: 10,
    right: 0,
    marginTop: 20,
  }

})