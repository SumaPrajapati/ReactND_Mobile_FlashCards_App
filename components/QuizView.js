import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Button from './Button'
import { connect } from 'react-redux'
import {white, red, gray, lightGreen } from '../utils/colors'
import {setQuizNotification, clearQuizNotification } from '../utils/helper'


const NoCards = () =>(
    <View style={styles.noCard}>
        <Text style={styles.cardText}>There's no card in deck Please add some of cards in the deck and then start quiz. </Text>
    </View>
);

const ResultView = (props) =>{
  return (
    <View>
        
        <View style={styles.quizContainer}>
            <Text>Deck: {props.deckTitle}</Text>
            <Text style={styles.cardText}>Total questions of answered:{props.totalAnswerResult}</Text>
            <Text style={styles.cardText}>Total currect answer:{props.correctAnswer}</Text>
        </View>
        <View style={styles.btnCorrect}>
            <Button text='Restart Quiz' func={props.handleRestart}></Button>
            <Button text='Back to Deck' func={props.handleBackToDeck}></Button> 
        </View>
    </View>)
}

class QuizView extends Component{
    constructor(){
        super();
        this.state= {
           currentQuestionId: 0,
           totalAnswer: 0,
           display: 'question',
           questResult: false,
        }
        this.toggleQuestionAnswer= this.toggleQuestionAnswer.bind(this)
    }
    
    toggleQuestionAnswer = ()=>{
        const display = (this.state.display) === 'question'
         ? 'answer'
         : 'question'

         this.setState({display})
    }

    backToDeck = () =>{
        this.props.navigation.navigate('DeckList')
    }

    handleCorrectAnswer(answer){
        if(answer === 'correct'){
            this.setState({totalAnswer:this.state.totalAnswer + 1})
        }

        if(this.state.currentQuestionId === this.props.decks.questions.length -1){
            this.setState({questResult : true})
        }else{
           this.setState({currentQuestionId: this.state.currentQuestionId +1})
        } 
    }

    restartQuiz = () =>{
        this.setState({currentQuestionId:0, totalAnswer:0, display:'question', questResult:false})
    }
 
    componentDidMount(){
        clearQuizNotification().then(setQuizNotification)  
    }  

    render(){
        const {decks} = this.props
        const {currentQuestionId} = this.state
        console.log('Today DECK QUESTION=====', decks)
        if(decks.questions.length === 0){
            return <NoCards/>
        }

        if(this.state.questResult){
            return <ResultView deckTitle={decks.title} totalAnswerResult={decks.questions.length} 
                               correctAnswer={this.state.totalAnswer}
                               handleRestart={this.restartQuiz}
                               handleBackToDeck={this.backToDeck} />
        } 

        const displayCard = decks.questions[currentQuestionId]
        console.log('Showing Questions here', displayCard)
        return (
            <View style={{flex:1}}>
                <View style={styles.quizContainer}>
                    <View>
                        <Text>Deck: {decks.title}</Text>
                    </View>
                       <View style={styles.displayText}>
                        {this.state.display === 'question' 
                                ? <View>
                                    <Text style={styles.cardText}>{displayCard.question}</Text>
                                    <Button text='Display Answer' func={this.toggleQuestionAnswer}  current={this.state.display}/> 
                                </View>
                                : <View>
                                    <Text style={styles.cardText}>{displayCard.answer}</Text>
                                    <View style={styles.btnCorrect}>
                                         <Button text='Display Question' func={this.toggleQuestionAnswer}  current={this.state.display}/>
                                    </View>
                                </View>
                            } 
                       </View>
                        <View>
                            <Text>Card:{currentQuestionId+1} / {decks.questions.length}</Text>
                        </View>     
                </View>
                <View style={styles.btnCorrect}>
                    <Button  text='Correct' func={()=>this.handleCorrectAnswer('correct')}/>
                    <Button text='Incorrect' func={()=>this.handleCorrectAnswer('incorrect')}/>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    noCard: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quizContainer:{
        backgroundColor: lightGreen,
        alignItems: 'center',
        flexBasis: 120,
        justifyContent: 'center',
        minHeight: 220,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginTop: 40,
        marginLeft: 30,
        width: 350,
        shadowOpacity: 1,
        elevation: 3
    },
    displayText:{
      paddingLeft: 50,
      paddingRight: 50,
    },
    cardText:{
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        fontSize: 24,
        alignItems: 'center'
    },
    btnCorrect: {
        alignItems: 'center',
        
    }
})

const mapStateToProps =(decks, ownProps)=>{
    const {deck} = ownProps.navigation.state.params
     //const desks= decks[deck]
    console.log('QUESTION*******', decks)
    return {
        decks: decks[deck]
    }
}
export default connect(mapStateToProps)(QuizView)