import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import {gray, white, lightGreen, orange} from '../utils/colors'
import Button from './Button'
import { connect } from 'react-redux'
import { addNewCard } from '../actions/index'

class AddCardView extends Component{
    constructor(){
        super()
        this.state ={
           question: '',
           answer: '',
        }
        this.handleQuestion = this.handleQuestion.bind(this)
        this.handleAnswer = this.handleAnswer.bind(this)
    }

    handleQuestion =(newQuest) =>{
        this.setState({
            question: newQuest
        })
    }
    handleAnswer = (newAnswer) =>{
        this.setState({
            answer: newAnswer
        })
    }
    handleSubmit = () =>{
       const {deck, addNewCard, navigation} = this.props
       const cardObj={
           question: this.state.question,
           answer: this.state.answer
       }
       if(this.state.question === '' && this.state.answer === ''){
           alert('Please enter the question and answer')
           return;
       } 
       console.log('today I am here', deck)
       addNewCard(deck, cardObj)
       this.setState({question: '', answer: ''})
       navigation.navigate('DeckView', {deck})
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.textStyle}>Add New Question</Text>
                <View style={styles.inputStyle}>
                <TextInput 
                            style={{fontSize: 20, color: white }}
                            placeholder='Enter the new question?'
                            value={this.state.quest}
                            onChangeText={this.handleQuestion}/>
                </View>
                <View style={styles.inputStyle}>
                <TextInput 
                            style={{fontSize: 20, color: white }}
                            placeholder='Answer of above question'
                            value={this.state.answer}
                            onChangeText={this.handleAnswer}/>
                </View>
                <View>
                    <Button text='Submit' func={this.handleSubmit}></Button>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
    textStyle:{
        textAlign:'center',
        fontSize: 30,
        color: orange,
        paddingBottom: 20
    },
   inputStyle:{
        backgroundColor: 'blue',
        marginTop: 15,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 380,
   }
})
const mapStateToProps =(state, {navigation})=>{
   const deck = navigation.getParam('deck', 'undefined');
    return {
      deck
    }
}
export default connect(mapStateToProps, {addNewCard})(AddCardView)